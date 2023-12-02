console.log('Hello day2');

const fs = require('fs');

// Read the games from file
const document = fs.readFileSync('day2.txt', 'utf-8');

// Split the document into lines
const lines = document.split('\n');


// Iterate through each line
lines.forEach(line => {
    line = line.trim();

    console.log('Line:', line);
});
