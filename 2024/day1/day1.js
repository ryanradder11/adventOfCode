console.log('Hello day1');

const fs = require('fs');

// Read the calibration document from file
const document = fs.readFileSync('day1.txt', 'utf-8');

// Split the document into lines
const lines = document.split('\n');

let leftValues = [];
let rightValues = [];

// Iterate through each line
lines.forEach(line => {
    line = line.trim();
    const [left, right] = line.split(/\s+/).map(Number);
    leftValues.push(left);
    rightValues.push(right);
});

console.log('Left Values:', leftValues);
console.log('Right Values:', rightValues);

leftValues = leftValues.sort((a, b) => a - b);
rightValues = rightValues.sort((a, b) => a - b);

console.log('sorted Left Values:', leftValues);
console.log('sorted Right Values:', rightValues);

let sum = 0;
leftValues.forEach((left, index) => {
    let timesFound = 0;
    for (let i = 0; i < rightValues.length; i++) {
        if (rightValues[i] === left) {
            timesFound++;
        }
    }
    sum += left * timesFound;
});

console.log('Total Sum:', sum);