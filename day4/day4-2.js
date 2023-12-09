console.log('Hello day4');

const fs = require('fs');
const document = fs.readFileSync('day4.txt', 'utf-8');
const lines = document.split('\n');
let gameCards = [];
let cardAnswers = [];

function normalizeLine(line) {
    line = cutOffGamePrefix(line);
    return line;
}

function cutOffGamePrefix(string) {
    const colonIndex = string.indexOf(":");
    if (colonIndex !== -1) {
        return string.slice(colonIndex + 1).trim();
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
lines.forEach((line) => {
    line = normalizeLine(line);
    line = line.split("|");
    gameCards.push(line[0].trim().split(/\s+/).map(Number));
    cardAnswers.push(line[1].trim().split(/\s+/).map(Number));
});

let totalCards = 0;

for (let i = 0; i < gameCards.length; i++) {
    processCard(i);
}

function processCard(index) {

    const commonNumbers = countCommonNumbers(gameCards[index], cardAnswers[index]);
    totalCards += commonNumbers;
    for (let i = 1; i <= commonNumbers; i++) {
        let nextIndex = index + i
        processCard(nextIndex);
    }
}
console.log('total cards:', totalCards + lines.length);
