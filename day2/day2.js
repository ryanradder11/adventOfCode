console.log('Hello day2');

const fs = require('fs');

// Read the games from file
const document = fs.readFileSync('day2-test.txt', 'utf-8');

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
            blue: 0,
            red: 0,
            green: 0
        };

        // Remove the game prefix and replace ; with ,
        line = cutOffGamePrefix(line);
        line = line.replaceAll(';', ',');
        console.log('Replaced line:', line);

        let colors = line.split(',');
        console.log('Colors:', colors);
        colors.forEach(color => {
            const nums = color.match(/\d+/g);
            if (color.includes('blue')) {
                game.blue = nums;
            } else if (color.includes('red')) {
                game.red = nums;
            } else if (color.includes('green')) {
                game.green = nums;
            }
        });

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


const games = createArrayOfGames(lines);
console.log(games);