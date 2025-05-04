// label_testament.js
// Node.js script to label each book as Old or New Testament in amharic_bible.json

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'amharic_bible.json');
const outputPath = path.join(__dirname, 'amharic_bible_labeled.json');

// List of New Testament book titles in Amharic
const newTestamentTitles = [
  'የማቴዎስ ወንጌል',
  'የማርቆስ ወንጌል',
  'የሉቃስ ወንጌል',
  'የዮሐንስ ወንጌል',
  'የሐዋርያት ሥራ',
  'ወደ ሮሜ ሰዎች',
  '1ኛ ወደ ቆሮንቶስ ሰዎች',
  '2ኛ ወደ ቆሮንቶስ ሰዎች',
  'ወደ ገላትያ ሰዎች',
  'ወደ ኤፌሶን ሰዎች',
  'ወደ ፊልጵስዩስ ሰዎች',
  'ወደ ቆላስይስ ሰዎች',
  '1ኛ ወደ ተሰሎንቄ ሰዎች',
  '2ኛ ወደ ተሰሎንቄ ሰዎች',
  '1ኛ ወደ ጢሞቴዎስ',
  '2ኛ ወደ ጢሞቴዎስ',
  'ወደ ቲቶ',
  'ወደ ፊልሞና',
  'ወደ ዕብራውያን',
  'የያዕቆብ መልእክት',
  '1ኛ የጴጥሮስ መልእክት',
  '2ኛ የጴጥሮስ መልእክት',
  '1ኛ የዮሐንስ መልእክት',
  '2ኛ የዮሐንስ መልእክት',
  '3ኛ የዮሐንስ መልእክት',
  'የይሁዳ መልእክት',
  'የዮሐንስ ራእይ'
];

function main() {
  const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  data.books = data.books.map(book => ({
    ...book,
    testament: newTestamentTitles.includes(book.title) ? 'new' : 'old',
  }));
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Labeled file written to', outputPath);
}

main();
