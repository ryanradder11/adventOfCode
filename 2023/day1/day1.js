console.log('Hello day1');

const fs = require('fs');

// Read the calibration document from file
const document = fs.readFileSync('day1.txt', 'utf-8');

// Split the document into lines
const lines = document.split('\n');

let sum = 0;

// Iterate through each line
lines.forEach(line => {
    line = line.trim();


    line = line.replace(/\D+/g, '');
    console.log('Line:', line);
    const firstDigit = parseInt(line.charAt(0));
    const lastDigit = parseInt(line.charAt(line.length - 1));

    // Combine the digits to get the calibration value
    const calibrationValue = parseInt(`${firstDigit}${lastDigit}`);

    // Add the calibration value to the sum
    sum += calibrationValue;
});


// Print the total sum of calibration values
console.log('Total Sum:', sum);