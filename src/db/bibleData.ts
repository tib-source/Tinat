import bibleData from "./amharic_bible.json"; // filepath: /Users/tibs/Projects/Tinat/src/db/seedDatabase.ts

interface Verse {
  text: string;
}

interface Chapter {
  verses: string[];
}

interface Book {
  title: string;
  chapters: Chapter[];
}

interface Bible {
  books: Book[];
}

export default bibleData as Bible;