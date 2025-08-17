#!/usr/bin/env python3
# ocr_to_amharic_bible.py
# Reads a single OCR output text file (utf-8) and produces a JSON Bible structure (Amharic only).

import re
import json
from pathlib import Path

INPUT = "amharic_bible.txt"
OUTPUT = "amharic_bible.json"

# CHARS range for Amharic (Ethiopic) letters
ETH_RANGE = (0x1200, 0x137F)

BOOK_KEYWORDS = [
    "ኦሪት", "መጽሐፈ", "መጽሐፍ", "መዝሙር", "ትንቢተ", "ወንጌል", "ማውጫ", "ብሉይ", "ዘፍ", "ዘጸ",
    "ዘሌ", "ሳሙኤል", "ነገሥት", "ዜና", "ዕዝራ", "አስቴር", "ኢዮብ", "ምሳሌ", "ሐጌ", "ዘካርያ"
]

CHAPTER_RE = re.compile(r'ምዕራፍ\s*(?P<num>\d+|[፩-፼]+)', re.UNICODE)
VERSE_AT_LINE_START_RE = re.compile(r'^(?P<num>\d+|[፩-፼]+)\s*[፤:።\.]?\s*(?P<text>.*)$', re.UNICODE)
INLINE_VERSE_PATTERN = re.compile(r'(?P<num>\d+|[፩-፼]+)\s*[፤:።\.]\s*', re.UNICODE)

# Helpers
def has_amharic(s):
    return any(ETH_RANGE[0] <= ord(c) <= ETH_RANGE[1] for c in s)

def is_page_header_footer(line):
    l = line.strip()
    if not l:
        return True
    # Known junk words
    junk = ["ማውጫ", "ብሉይ ኪዳን", "Old Testament", "New Testament", "Table of Contents", "Contents"]
    if any(k.lower() in l.lower() for k in junk):
        return True
    # lines that are only digits or punctuation (likely page numbers or dot leaders)
    if re.fullmatch(r'[\d\.\-]{1,6}', l):
        return True
    if re.fullmatch(r'[\.\- ]{3,}', l):
        return True
    # lines with extremely low ratio of letters -> junk
    letters = sum(1 for ch in l if ch.isalpha() or (ETH_RANGE[0] <= ord(ch) <= ETH_RANGE[1]))
    if len(l) >= 1 and letters / len(l) < 0.3:
        return True
    return False

def ethiopic_to_int(s):
    # Simple additive conversion for common Ethiopic numerals.
    if not s:
        return None
    s = s.strip()
    if re.fullmatch(r'\d+', s):
        return int(s)
    map_ = {
        '፩':1,'፪':2,'፫':3,'፬':4,'፭':5,'፮':6,'፯':7,'፰':8,'፱':9,
        '፲':10,'፳':20,'፴':30,'፵':40,'፶':50,'፷':60,'፸':70,'፹':80,'፺':90,
        '፻':100,'፼':10000
    }
    total = 0
    current = 0
    for ch in s:
        if ch in ('፻','፼'):
            if current == 0:
                current = 1
            total += current * map_[ch]
            current = 0
        else:
            v = map_.get(ch)
            if v:
                current += v
    total += current
    return total if total != 0 else None

def split_inline_verses(line):
    """If a line contains multiple inline verses (1፤ text 2፤ text), yield (num, text) pairs."""
    matches = list(INLINE_VERSE_PATTERN.finditer(line))
    if not matches:
        return None
    out = []
    for i, m in enumerate(matches):
        num = m.group('num')
        start = m.end()
        end = matches[i+1].start() if i+1 < len(matches) else len(line)
        text = line[start:end].strip()
        out.append((num, text))
    return out

def find_book_title_before(lines, idx):
    """Scan backward for a likely book title (Amharic words) up to N lines."""
    start = max(0, idx-12)
    candidate = None
    for j in range(idx-1, start-1, -1):
        ln = lines[j].strip()
        if not ln or is_page_header_footer(ln):
            continue
        # If it contains book keywords or it's mostly Amharic letters and shortish, take it
        if any(k in ln for k in BOOK_KEYWORDS) or (has_amharic(ln) and len(ln) < 120):
            candidate = ln
            break
    return candidate

def parse_ocr_text(raw_text):
    # normalize
    raw_text = raw_text.replace('\r', '')
    # preserve single blank lines but remove repeated blanklines to 1
    raw_text = re.sub(r'\n{3,}', '\n\n', raw_text)
    lines = raw_text.splitlines()

    bible = {"title": "አማርኛ መጽሐፍ ቅዱስ", "books": []}
    current_book = None
    current_chapter = None
    last_verse_idx = None

    for i, raw in enumerate(lines):
        line = raw.strip()
        if not line:
            continue

        # If the line contains obvious book-keyword -> treat as book title
        if any(k in line for k in BOOK_KEYWORDS) and has_amharic(line):
            # close previous
            if current_chapter and current_book:
                current_book["chapters"].append(current_chapter)
                current_chapter = None
            if current_book:
                bible["books"].append(current_book)
            current_book = {"title": line, "chapters": []}
            last_verse_idx = None
            # sometimes the same line may contain "ኦሪት ዘፍጥረት (..)" which is fine
            continue

        # Chapter detection
        ch = CHAPTER_RE.search(line)
        if ch:
            # extract chapter number (convert Ethiopic to int if needed)
            raw_num = ch.group('num')
            chnum = ethiopic_to_int(raw_num) or raw_num
            # close previous chapter
            if current_chapter and current_book:
                current_book["chapters"].append(current_chapter)
            # ensure book exists (try to find one above if missing)
            if current_book is None:
                title_guess = find_book_title_before(lines, i) or "Unknown"
                current_book = {"title": title_guess, "chapters": []}
                bible["books"].append(current_book)
            current_chapter = {"chapter": str(chnum), "verses": []}
            last_verse_idx = None
            # process remainder of line after chapter header (may contain verse(s))
            after = line[ch.end():].strip()
            if after:
                # try inline split or verse at start
                inline = split_inline_verses(after)
                if inline:
                    for num, txt in inline:
                        txt = txt.strip()
                        if txt:
                            current_chapter["verses"].append(txt)
                            last_verse_idx = len(current_chapter["verses"]) - 1
                else:
                    m = VERSE_AT_LINE_START_RE.match(after)
                    if m:
                        txt = m.group('text').strip()
                        if txt:
                            current_chapter["verses"].append(txt)
                            last_verse_idx = len(current_chapter["verses"]) - 1
            continue

        # Verse detection (inline multiple or start-of-line)
        inline = split_inline_verses(line)
        if inline and current_chapter is not None:
            for num, txt in inline:
                txt = txt.strip()
                current_chapter["verses"].append(txt)
                last_verse_idx = len(current_chapter["verses"]) - 1
            continue

        m = VERSE_AT_LINE_START_RE.match(line)
        if m and current_chapter is not None:
            txt = m.group('text').strip()
            current_chapter["verses"].append(txt)
            last_verse_idx = len(current_chapter["verses"]) - 1
            continue

        # If it's not a verse/chapter/book, treat as a continuation for last verse
        if current_chapter is not None and last_verse_idx is not None:
            cont = line.strip()
            # append with a space (avoid duplicate spaces)
            prev = current_chapter["verses"][last_verse_idx]
            if prev and not prev.endswith(('።','፣','፤','.',':','?','!')):  # if no end punctuation, keep space
                current_chapter["verses"][last_verse_idx] = (prev + " " + cont).strip()
            else:
                current_chapter["verses"][last_verse_idx] = (prev + cont).strip()
            continue

        # fallback: if we get here and current book/chapter are missing but the line looks like verse text,
        # create fallback book/chapter
        if current_book is None or current_chapter is None:
            # ignore small junk lines
            if has_amharic(line) and len(line) > 10:
                if current_book is None:
                    title_guess = find_book_title_before(lines, i) or "Unknown"
                    current_book = {"title": title_guess, "chapters": []}
                    bible["books"].append(current_book)
                if current_chapter is None:
                    current_chapter = {"chapter": "1", "verses": []}
                    current_book["chapters"].append(current_chapter)
                    last_verse_idx = None
                # attempt inline split
                inline = split_inline_verses(line)
                if inline:
                    for num, txt in inline:
                        current_chapter["verses"].append(txt.strip())
                    last_verse_idx = len(current_chapter["verses"]) - 1
                else:
                    # put entire line as continuation or new verse depending
                    if current_chapter["verses"]:
                        current_chapter["verses"][-1] += " " + line
                    else:
                        current_chapter["verses"].append(line)
                        last_verse_idx = len(current_chapter["verses"]) - 1
            continue

        # else: skip the line (likely TOC or footer)
        continue

    # finalize closing
    if current_chapter and current_book:
        if current_chapter not in current_book["chapters"]:
            current_book["chapters"].append(current_chapter)
    # ensure current_book is appended
    # (we appended a book when we created it except some fallback paths; ensure final book is present)
    if current_book and (not bible["books"] or bible["books"][-1] is not current_book):
        bible["books"].append(current_book)

    # clean out empty chapters and books
    for b in bible["books"]:
        b["chapters"] = [ch for ch in b["chapters"] if ch.get("verses")]
    bible["books"] = [b for b in bible["books"] if b["chapters"]]

    return bible

def main():
    p = Path(INPUT)
    if not p.exists():
        print(f"Input file {INPUT} not found. Put your OCR text in {INPUT}")
        return
    raw = p.read_text(encoding="utf-8")

    print("Parsing OCR text...")
    bible = parse_ocr_text(raw)

    # Save JSON
    Path(OUTPUT).write_text(json.dumps(bible, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved {OUTPUT} — {len(bible['books'])} books, approx "
          f"{sum(len(b['chapters']) for b in bible['books'])} chapters.")

if __name__ == "__main__":
    main()
