console.log('Hello day4');

const fs = require('fs');

// Read the games from file
const document = fs.readFileSync('day4.txt', 'utf-8');

// Split the document into lines
const lines = document.split('\n');


const gamesLines = [];
const cardLines = [];
const answerLines = [];

function normalizeLine(line) {
    line = cutOffGamePrefix(line);
    return line;
}

function cutOffGamePrefix(string) {
    const colonIndex = string.indexOf(":");
    if (colonIndex !== -1) {
        return string.slice(colonIndex + 1).trim();
    } else {
        return string.trim();
    }
}

function countCommonNumbers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    let count = 0;

    set1.forEach((num) => {
        if (set2.has(num)) {
            count++;
        }
    });

    return count;
}
lines.forEach((line, index) => {
    //Normalize and push to engineSchematics Array
    line = normalizeLine(line);
    gamesLines.push(line);

    line = line.split('|');
    cardLines.push(line[0].trim().split(/\s+/).map(Number));
    answerLines.push(line[1].trim().split(/\s+/).map(Number));
});



let answer = 0;
gamesLines.forEach((line, index) => {
    console.log('Index:', index);
    console.log('GameLine:', line);
    console.log('CardsLine:', cardLines[index]);
    console.log('AnswerLine:', answerLines[index]);
    const commonNumbers = countCommonNumbers(cardLines[index], answerLines[index]);
    let answerToAdd = 0;
    if(commonNumbers === 0) {
        answerToAdd = 0;
    } else if(commonNumbers === 1) {
        answerToAdd = 1;
    }else if(commonNumbers === 2) {
        answerToAdd = 2;
    }else  {
        answerToAdd = 2 ** (commonNumbers - 1);
    }
    console.log('Common numbers:', commonNumbers);
    console.log('Answer to add:', answerToAdd);
    answer += answerToAdd;
});



console.log('Games lines:', gamesLines);
console.log('answer:', answer);