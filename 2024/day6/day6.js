let times = [50 ,74, 86, 85];
let records = [242, 1017, 1691, 1252];
getWaysToWin = (raceTime, bestDist) =>
    Array.from({length: raceTime + 1}, (_, n) => (raceTime - n) * n > bestDist ? 1 : 0)
        .reduce((a, b) => a + b, 0);
let totalScore = 1;
for( let i = 0, j = times.length; i < j; i++ ){
    totalScore *= getWaysToWin( times[ i ], records[ i ] );
}
console.log( 'Answer 1, Answer 2: ',totalScore + ' ' + getWaysToWin(parseInt(times.join('')), parseInt(records.join(''))) );