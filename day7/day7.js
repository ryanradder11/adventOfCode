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

let fiveOfAKind = [7, identifier = (hand) => /^(\w)\1*$/.test(hand)];
let fourOfAKind = [6, identifier = (hand) => /^(\w)\1{3}$/.test(hand)];
let fullHouse = [5, identifier = (hand) => /^(\w)\1{2}(\w)\2$/.test(hand)];
let threeOfAKind = [4, identifier = (hand) => /^(\w)\1{2}$/.test(hand)];
let twoPair = [3, identifier = (hand) => /^(\w)\1(\w)\2$/.test(hand)];
let onePair = [2, identifier = (hand) => /^(\w)\1$/.test(hand)];
let highCard = [1, identifier = (hand) => !/(.).*\1/.test(hand)];

hands.forEach((hand, index) => {
    if(fiveOfAKind[1](hand)) {
        console.log('five of a kind: '+ hand);
        return;
    }
    if(fourOfAKind[1](hand)) {
        console.log('four of a kind: '+ hand);
        return;
    }
    if(fullHouse[1](hand)) {
        console.log('full house: '+ hand);
        return;
    }
    if(threeOfAKind[1](hand)) {
        console.log('three of a kind: '+ hand);
        return;
    }
    if(twoPair[1](hand)) {
        console.log('two pair: '+ hand);
        return;
    }
    if(onePair[1](hand)) {
        console.log('one pair: '+ hand);
        return;
    }
    if(highCard[1](hand)) {
        console.log('high card: '+ hand);

    }
});