console.log('Hello day3');

const fs = require('fs');

// Read the games from file
const document = fs.readFileSync('day4.txt', 'utf-8');

// Split the document into lines
const lines = document.split('\n');


const lineLength = lines[0].length;
const engingeSchematics = [];

lines.forEach((line, index) => {

    //Normalize and push to engineSchematics Array
    line = normalizeLine(line);
    engingeSchematics.push(line);
});


function normalizeLine(line) {
    const regex = /[$/&*+#@%=]/g;
    line = line.trim();
    line = line.replace(regex, '*');
    return line;
}


let totalSumArrayOfEnginParts = [];
engingeSchematics.forEach((schematicLine, index) => {

    console.log('Schematic line unProcessed:', (index + ': ' + schematicLine));
    const processedSchematicsLine = processSchematicsLine(schematicLine);
    console.log('Schematic line processed:', (index + ': ' + JSON.stringify(processedSchematicsLine)));
    //If the line is empty, return
    if(processedSchematicsLine.length === 0) {
        console.log('Schematic line: ' + index + ' is empty');
        return;
    }

    //iterate all values in the line
    processedSchematicsLine.forEach((valueAndPosition) => {
        const previousLine = (index === 0) ? undefined: engingeSchematics[index - 1];
        const currentLine = engingeSchematics[index];
        const nextLine = (index < engingeSchematics.length) ? engingeSchematics[index + 1]: undefined;
        // console.log('Previous line:', previousLine);
        // console.log('Current line:', currentLine);
        // console.log('Next line:', nextLine);
        console.log('Value and position:', valueAndPosition);

        //check if the value has a * adjacent to it
        let adjacentFound = false;
        valueAndPosition.positions.forEach((position) => {
            if(adjacentFound) {return;}

            //calibrate position
            let pos;
            pos = (position > currentLine.length) ? currentLine.length: position;
            // console.log('Position:', pos);
            if(previousLine && previousLine.charAt(pos) === '*') {
                adjacentFound = true;
                totalSumArrayOfEnginParts.push(valueAndPosition.value);
                console.log('Found!! at previous line position:', pos);
            }
            else if(currentLine && currentLine.charAt(pos) === '*') {
                adjacentFound = true;
                totalSumArrayOfEnginParts.push(valueAndPosition.value);
                console.log('Found!! at current line position:', pos);
            }
            else if(nextLine && nextLine.charAt(pos) === '*') {
                adjacentFound = true;
                totalSumArrayOfEnginParts.push(valueAndPosition.value);
                console.log('Found!! at next line position:', pos);
            }
            else {
                console.log('No * found at position:', pos);
            }
        });
        console.log('Total sum:', totalSumArrayOfEnginParts);
    });

});

// expected output example [{"value":664,"positions":[1,2,3]},{"value":598,"position":[5,6,7]}]
function processSchematicsLine(str) {
    var result = [];

    var tempValue = '';
    var tempPositions = [];

    for (var i = 0; i < str.length; i++) {
        var char = str[i];

        // Check if the character is a number
        if (!isNaN(char)) {
            tempValue += char;

            // add adjacent position if it is the first found number
            if(tempPositions.length === 0) {
                tempPositions.push( (i <= 0) ? 0 : i - 1);
            }
            if(i === str.length - 1) {
                tempPositions.push(i);
            }
            tempPositions.push(i);
            tempPositions.push(i + 1);
        } else {
            if (tempValue !== '') {
                result.push({ value: parseInt(tempValue), positions: tempPositions });
                tempValue = '';
                tempPositions = [];
            }
        }
    }

    // Check if there is any remaining value and positions
    if (tempValue !== '') {
        result.push({ value: parseInt(tempValue), positions: removeDuplicates(tempPositions) });
    }

    return result;
}

function removeDuplicates(arr) {
    return arr.filter((item,
                       index) => arr.indexOf(item) === index);
}

// console.log('Engine schematics:', engingeSchematics);
// totalSumArrayOfEnginParts = removeDuplicates(totalSumArrayOfEnginParts);
let answer = 0;
totalSumArrayOfEnginParts.forEach((value, index) => {
    console.log('Value:', value);
    answer += value;
});
console.log('Total sum:', totalSumArrayOfEnginParts);
console.log('Answer:', answer);
