console.log('Hello day7');

const fs = require('fs');
const document = fs.readFileSync('day7.txt', 'utf-8');
const lines = document.split('\n');

let hands = [];
let bets = [];
lines.forEach((line) => {
    line = line.split(' ');
    hands.push(line[0]);
    bets.push(line[1]);
});

hands.forEach((hand, index) => {
    console.log(hand, bets[index]);
});