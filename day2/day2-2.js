console.log('Hello day2');

const fs = require('fs');

// Read the games from file
const document = fs.readFileSync('day2.txt', 'utf-8');

// Split the document into lines
const lines = document.split('\n');


// Iterate through each line
lines.forEach(line => {
    line = line.trim();

    console.log('Line:', line);
});


function createArrayOfGames(lines) {
    const games = [];

    lines.forEach(line => {
        console.log('Line:', line);

        const game = {
            blue: [],
            red: [],
            green: [],
        };

        // Remove the game prefix and replace ; with ,
        line = cutOffGamePrefix(line);
        line = line.replaceAll(';', ',');
        console.log('Replaced line:', line);

        let colors = line.split(',');
        console.log('Colors:', colors);
        colors.forEach(color => {
            color = color.trim();
            const nums = color.match(/\d+/g);
            if (color.includes('blue')) {
                game.blue.push(nums[0]);
            } else if (color.includes('red')) {
                game.red.push(nums[0]);
            } else if (color.includes('green')) {
                game.green.push(nums[0]);
            }
        });

        //get max of each color
        game.red = Math.max(...game.red);
        game.blue = Math.max(...game.blue);
        game.green = Math.max(...game.green);
        games.push(game);
    });

    return games;
}

function cutOffGamePrefix(string) {
    const colonIndex = string.indexOf(":");
    if (colonIndex !== -1) {
        return string.slice(colonIndex + 1).trim();
    } else {
        return string.trim();
    }
}

function getSumOfGame(game) {
    return game.blue * game.red * game.green;
}

const games = createArrayOfGames(lines);

let totalSum = 0;
games.forEach((game, index) => {

    const sum = getSumOfGame(game);
    console.log('Index:', index);
    console.log('Game:', game);
    console.log('Sum:', sum);
    totalSum += sum;
});

console.log('Total sum:', totalSum);
