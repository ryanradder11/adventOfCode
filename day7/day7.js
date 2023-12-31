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

//In comes AA87B -> 78AAB
//sort the hands before checking for patterns
hands = hands.map((hand) => {
   let handArray = hand.split('');
    return  handArray.sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0);
    }).toString().replace(/,/g, '');
});


let fiveOfAKind = [7, identifier = (hand) => /^(\w)\1*$/.test(hand)];
let fourOfAKind = [6, identifier = (hand) => /^(\w)\1{3}$/.test(hand)];
let fullHouse = [5, identifier = (hand) => {
        let counts = Array.from(hand).reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});
        let vals = Object.values(counts);
        return (vals.includes(2) && vals.includes(3));
    }];
let threeOfAKind = [4, identifier = (hand) => /(\w)(?=(.*\1){2})(?!(.*\1){3})/.test(hand)];
let twoPair = [3, identifier = (hand) => /(\w).*\1.*(\w).*\2/.test(hand)];
let onePair = [2, identifier = (hand) => /(\w).*\1/.test(hand)];
let highCard = [1, identifier = (hand) => !/(.).*\1/.test(hand)];

// hands = ['T42JT'];

let testHand = 'T42JT';

console.log('five of a kind: '+ fiveOfAKind[1](testHand));
console.log('four of a kind: '+ fourOfAKind[1](testHand));
console.log('three of a kind: '+ threeOfAKind[1](testHand));
console.log('two pair: '+ twoPair[1](testHand));
console.log('one pair: '+ onePair[1](testHand));
console.log('high card: '+ highCard[1](testHand));
hands.forEach((hand, index) => {
    if(fiveOfAKind[1](hand)) {
        console.log('five of a kind: '+ hand);
    }
    else if(fourOfAKind[1](hand)) {
        console.log('four of a kind: '+ hand);
    }
    else if(fullHouse[1](hand)) {
        console.log('full house: '+ hand);
    }
    else if(threeOfAKind[1](hand)) {
        console.log('three of a kind: '+ hand);
    }
    else if(twoPair[1](hand)) {
        console.log('two pair: '+ hand);
    }
    else if(onePair[1](hand)) {
        console.log('one pair: '+ hand);
    }
    else if(highCard[1](hand)) {
        console.log('high card: '+ hand);
    } else {
        console.log('no hand: '+ hand);
    }

});