//time
let times =   [71530];
let records = [940200];
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
    console.log('time: ' + time);
    console.log('------------------');
    console.log('maxDistance: ' + maxDistance);
    console.log('------------------');
    return maxDistance;
}
let maxDistances = times.map((time, index) => calculateMaxDistance(index));
console.log(maxDistances);
console.log(possibleWinss);
console.log('------------------');
console.log('anser: ',possibleWinss[0].length);