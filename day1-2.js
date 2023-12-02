
console.log('Hello day2');

const fs = require('fs');

// Read the calibration document from file
const document = fs.readFileSync('day1.txt', 'utf-8');

// Split the document into lines
const lines = document.split('\n');

let sum = 0;

// Iterate through each line
lines.forEach(line => {
    line = line.trim();

    console.log('Line:', line);

    // Replace the words with numbers
    line = replaceAllNumbers(line);
    console.log('Line with word to numbers:', line);

    //again so we handle eightteen eightwo etc
    line = replaceAllNumbers(line);
    console.log('Line with word to numbers again:', line);

    // Remove all non-digits
    line = line.replace(/\D+/g, '');
    console.log('Line trimmed:', line);

    const firstDigit = parseInt(line.charAt(0));
    const lastDigit = parseInt(line.charAt(line.length - 1));

    // Combine the digits to get the calibration value
    const calibrationValue = parseInt(`${firstDigit}${lastDigit}`);

    // Add the calibration value to the sum
    sum += calibrationValue;
});


// Print the total sum of calibration values
console.log('Total Sum:', sum);

function replaceAllNumbers(line )  {
    line = line.replace(/one/g, 'one1one');
    line = line.replace(/two/g, 'two2two');
    line = line.replace(/three/g, 'three3three');
    line = line.replace(/four/g, 'four4four');
    line = line.replace(/five/g, 'five5five');
    line = line.replace(/six/g, 'six6six');
    line = line.replace(/seven/g, 'seven7seven');
    line = line.replace(/eight/g, 'eight8eight');
    line = line.replace(/nine/g, 'nine9nine');
    return line;
}
