# from multilingual_pdf2text.pdf2text import PDF2Text
# from multilingual_pdf2text.models.document_model.document import Document
# import logging

# logging.basicConfig(level=logging.INFO)

# def main():
#     pdf_document = Document(
#         document_path="./../src/db/ethiopian_bible.pdf",
#         language='amh'
#     )

#     pdf2text = PDF2Text(document=pdf_document)
#     content = pdf2text.extract()

#     # Save extracted text
#     with open("amharic_bible.txt", "w", encoding="utf-8") as f:
#         for line in content:
#             f.write(f"{line}\n")

#     print("Extraction complete! Saved to amharic_bible.txt")

# if __name__ == "__main__":
#     main()


import fitz  # PyMuPDF
import json

doc = fitz.open("./../src/db/ethiopian_bible.pdf")
page = doc[0]

# Try different extraction methods
text1 = page.get_text("text")
text2 = page.get_text("dict")  # More detailed extraction
text3 = page.get_text("rawdict")  # Even more raw data

print(f"{text1=}")
print(f"{text2=}")
print(f"{text3=}")