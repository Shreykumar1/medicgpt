const fs = require('fs');
const path = require('path');

// Define the input and output file paths
const inputFilePath = path.join(__dirname, 'test.dat');
const outputFilePath = path.join(__dirname, 'medical_book.json');

// Function to split text into sentences
function splitIntoSentences(text) {
  // Regular expression to match sentence endings
  const sentenceRegex = /[^.!?]+[.!?]+/g;
  return text.match(sentenceRegex) || [];
}

// Function to group sentences into chunks of a specified size
function groupSentences(sentences, chunkSize) {
  const chunks = [];
  for (let i = 0; i < sentences.length; i += chunkSize) {
    const chunk = sentences.slice(i, i + chunkSize).join(' ').trim();
    if (chunk) {
      chunks.push(chunk);
    }
  }
  return chunks;
}

// Read the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the input file:', err);
    return;
  }

  // Split the content into sentences
  const sentences = splitIntoSentences(data);

  // Group sentences into chunks of 5
  const chunks = groupSentences(sentences, 5);

  // Create JSON entries with unique IDs
  const jsonEntries = chunks.map((chunk, index) => ({
    id: index + 1,
    text: chunk
  }));

  // Write the JSON entries to the output file
  fs.writeFile(outputFilePath, JSON.stringify(jsonEntries, null, 2), 'utf8', err => {
    if (err) {
      console.error('Error writing the output file:', err);
      return;
    }
    console.log(`Successfully processed ${jsonEntries.length} entries.`);
    console.log(`Output written to ${outputFilePath}`);
  });
});
