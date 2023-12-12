//time
let times =   [50748685];
let records = [242101716911252];
let possibleWinss = [[]];
function calculateMaxDistance(index) {
    let time = times[index];
    let record= records[index];
    let maxDistance = 0;
    for(let i = 0; i < time; i++) {
        let speed = i;
        let travelTime = time - i;
        let distance = speed * travelTime;
        if(distance > record) {
            if (!possibleWinss[index]) {
                possibleWinss[index] = [];
            }
            possibleWinss[index].push(distance);
        }
        if(distance > maxDistance) {
            maxDistance = distance;
        }
    }

     getWaysTowin = ( raceTime, bestDist ) => {
        var waysToWin = 0;
        for( let n = 0; n <= raceTime; n++ ){
            // If you hold button n ms, the boat gets a speed of n (mm/ms), for remaining ( length - n ) ms of the race
            if( ( ( raceTime - n ) * n ) > bestDist ){
                waysToWin++;
            }
        }
        return waysToWin;
    }
    console.log('time: ' + time);
    console.log('------------------');
    console.log('maxDistance: ' + maxDistance);
    console.log('------------------');
    return maxDistance;
}
let maxDistances = times.map((time, index) => calculateMaxDistance(index));
console.log(maxDistances);
console.log(possibleWinss.length);
console.log('------------------');
console.log('answser: ',getWaysTowin(times[0], records[0]));