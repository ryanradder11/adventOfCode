getWaysToWin = (raceTime, bestDist ) => {
    let waysToWin = 0;
    for( let n = 0; n <= raceTime; n++ ){
        if( ( ( raceTime - n ) * n ) > bestDist ){
            waysToWin++;
        }
    }
    return waysToWin;
}
console.log('Answer: ',getWaysToWin(50748685, 242101716911252));