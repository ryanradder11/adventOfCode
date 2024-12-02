const fs = require('fs');

// Read the content of the file
const data = fs.readFileSync('day1.txt', 'utf8');

var splitData = data.split('\n');
var sum = 0;
var countIndex = 0;

splitData.forEach((line) => {
    console.log(line);

    line = line.replace(/\D/g, ''); // Remove all non-numeric characters

    var firstDigitMatch = line.match(/\d/);
    var firstDigit = firstDigitMatch ? firstDigitMatch[0] : null;

    var lastDigitMatch = line.match(/\d$/);
    var lastDigit = lastDigitMatch ? lastDigitMatch[0] : null;

    var combinedDigits = firstDigit + lastDigit;

    sum += parseInt(combinedDigits);

    console.log(combinedDigits);

    countIndex++;
    sum = sum * countIndex;
});


console.log(countIndex)

// Iterate through each line
console.log(sum);


// Combine the digits to get the calibration value

// Add the calibration value to the sum


// Print the total sum of calibration values
