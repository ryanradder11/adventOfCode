console.log('Hello day5');

const fs = require('fs');
const document = fs.readFileSync('day5-test.txt', 'UTF-8').split('\n').filter(line => line.trim() !== '');
const seeds = document[0].split(': ')[1].split(' ').map(Number);
console.log('seeds:', seeds);

let seedToSoil = [];
let soilToFertilizer = [];
let fertilizerToWater = [];
let waterToLight = [];
let lightToTemperature = [];
let temperatureToHumidity = [];
let humidityToLocation = [];

let searchSeedToSoilBegin = 0;
let searchSeedToSoilEnd = 0;
let searchSoilToFertilizerBegin = 0;
let searchSoilToFertilizerEnd = 0;
let searchFertilizerToWaterBegin = 0;
let searchFertilizerToWaterEnd = 0;
let searchWaterToLightBegin = 0;
let searchWaterToLightEnd = 0;
let searchLightToTemperatureBegin = 0;
let searchLightToTemperatureEnd = 0;
let searchTemperatureToHumidityBegin = 0;
let searchTemperatureToHumidityEnd = 0;
let searchHumidityToLocationBegin = 0;
let searchHumidityToLocationEnd = document.length
for (let i = 1; i < document.length; i++) {

    if(document[i].includes('seed-to-soil map:')) {
        searchSeedToSoilBegin = i;
    }
    if(document[i].includes('soil-to-fertilizer map:')) {
        searchSeedToSoilEnd = i;
        searchSoilToFertilizerBegin = i;
    }
    if(document[i].includes('fertilizer-to-water map:')) {
        searchFertilizerToWaterBegin = i;
        searchSoilToFertilizerEnd = i;
    }
    if(document[i].includes('water-to-light map:')) {
        searchFertilizerToWaterEnd = i;
        searchWaterToLightBegin = i;
    }
    if(document[i].includes('light-to-temperature map')) {
        searchWaterToLightEnd = i;
        searchLightToTemperatureBegin = i;
    }
    if(document[i].includes('temperature-to-humidity map')) {
        searchLightToTemperatureEnd = i;
        searchTemperatureToHumidityBegin = i;
    }
    if(document[i].includes('humidity-to-location map:')) {
        searchTemperatureToHumidityEnd = i;
        searchHumidityToLocationBegin = i;
    }
}

function createRanges(line) {
    return {
        destinationRanges: createRange(line[0], line[2]),
        sourceRanges: createRange(line[1], line[2]),
    }
}
function createRange(rangeStart, rangeLength) {
    let range = [];
    for(let i = rangeStart; i < rangeStart + rangeLength; i++) {
        range.push(i);
    }
    return range;
}
seedToSoil = document.slice(searchSeedToSoilBegin + 1, searchSeedToSoilEnd).map(line => line.split(' ').map(Number))
soilToFertilizer = document.slice(searchSoilToFertilizerBegin + 1, searchSoilToFertilizerEnd).map(line => line.split(' ').map(Number));
fertilizerToWater = document.slice(searchFertilizerToWaterBegin + 1, searchFertilizerToWaterEnd).map(line => line.split(' ').map(Number));
waterToLight = document.slice(searchWaterToLightBegin + 1, searchWaterToLightEnd).map(line => line.split(' ').map(Number));
lightToTemperature = document.slice(searchLightToTemperatureBegin + 1, searchLightToTemperatureEnd).map(line => line.split(' ').map(Number));
temperatureToHumidity = document.slice(searchTemperatureToHumidityBegin + 1, searchTemperatureToHumidityEnd).map(line => line.split(' ').map(Number));
humidityToLocation = document.slice(searchHumidityToLocationBegin + 1, searchHumidityToLocationEnd).map(line => line.split(' ').map(Number));

seedToSoilMaps= seedToSoil.map(line => createRanges(line));
soilToFertilizerMaps = soilToFertilizer.map(line => createRanges(line));
fertilizerToWaterMaps = fertilizerToWater.map(line => createRanges(line));
waterToLightMaps = waterToLight.map(line => createRanges(line));
lightToTemperatureMaps = lightToTemperature.map(line => createRanges(line));
temperatureToHumidityMaps = temperatureToHumidity.map(line => createRanges(line));
humidityToLocationMaps = humidityToLocation.map(line => createRanges(line));



    function findCorrespondingLocation(seed) {
        function getClosestValue(arr, target) {
            return arr.reduce((prev, curr) => {
                return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
            });
        }

        let currentNumber = seed;

        // Convert seed through seedToSoilMaps
        let originalSeedToSoilNumber = currentNumber;
        let foundSeedToSoilNumbers = [];
        seedToSoilMaps.forEach((map) => {
            if (map.sourceRanges.includes(currentNumber)) {
                const index = map.sourceRanges.indexOf(currentNumber);
                currentNumber = map.destinationRanges[index];
                foundSeedToSoilNumbers.push(currentNumber);
            }
        });
        if(foundSeedToSoilNumbers.length === 0) {
            foundSeedToSoilNumbers.push(currentNumber);
        }
        currentNumber = getClosestValue(foundSeedToSoilNumbers, originalSeedToSoilNumber);
        console.log('current-SeedToSoilNumber:', currentNumber);

        // Convert seed through soilToFertilizerMaps
        let originalSoilToFertilizerNumber = currentNumber;
        let foundSoilToFertilizerNumbers = [];
        soilToFertilizerMaps.forEach((map) => {
            if (map.sourceRanges.includes(currentNumber)) {
                const index = map.sourceRanges.indexOf(currentNumber);
                currentNumber = map.destinationRanges[index];
                foundSoilToFertilizerNumbers.push(currentNumber);
                // console.log('transformed-SoilToFertilizerNumber:', currentNumber);
            }
        });
        if(foundSoilToFertilizerNumbers.length === 0) {
            foundSoilToFertilizerNumbers.push(currentNumber);
        }
        currentNumber = getClosestValue(foundSoilToFertilizerNumbers, originalSoilToFertilizerNumber);
        console.log('current-SoilToFertilizerNumber:', currentNumber);

        // Convert seed through fertilizerToWaterMaps
        let originalFertilizerToWaterNumber = currentNumber;
        let foundFertilizerToWaterNumbers = [];
        fertilizerToWaterMaps.forEach((map) => {
            if (map.sourceRanges.includes(currentNumber)) {
                const index = map.sourceRanges.indexOf(currentNumber);
                currentNumber = map.destinationRanges[index];
                foundFertilizerToWaterNumbers.push(currentNumber);
                // console.log('transformed-FertilizerToWaterNumber:', currentNumber);
            }
        });
        if(foundFertilizerToWaterNumbers.length === 0) {
            foundFertilizerToWaterNumbers.push(currentNumber);
        }
        currentNumber = getClosestValue(foundFertilizerToWaterNumbers, originalFertilizerToWaterNumber);
        console.log('current-FertilizerToWaterNumber:', currentNumber);

        // Convert seed through waterToLightMaps
        let originalWaterToLightNumber = currentNumber;
        let foundWaterToLightNumbers = [];
        waterToLightMaps.forEach((map) => {
            if (map.sourceRanges.includes(currentNumber)) {
                const index = map.sourceRanges.indexOf(currentNumber);
                currentNumber = map.destinationRanges[index];
                foundWaterToLightNumbers.push(currentNumber);
                // console.log('transformed-WaterToLightNumber:', currentNumber);
            }
        });
        if(foundWaterToLightNumbers.length === 0) {
            foundWaterToLightNumbers.push(currentNumber);
        }
        currentNumber = getClosestValue(foundWaterToLightNumbers, originalWaterToLightNumber);
        console.log('current-WaterToLightNumber:', currentNumber);

        // Convert seed through lightToTemperatureMaps
        let originalLightToTemperatureNumber = currentNumber;
        let foundLightToTemperatureNumbers = [];
        lightToTemperatureMaps.forEach((map) => {
            if (map.sourceRanges.includes(currentNumber)) {
                const index = map.sourceRanges.indexOf(currentNumber);
                currentNumber = map.destinationRanges[index];
                foundLightToTemperatureNumbers.push(currentNumber);
                // console.log('transformed-LightToTemperatureNumber:', currentNumber);
            }
        });
        if(foundLightToTemperatureNumbers.length === 0) {
            foundLightToTemperatureNumbers.push(currentNumber);
        }
        currentNumber = getClosestValue(foundLightToTemperatureNumbers, originalLightToTemperatureNumber);
        console.log('current-LightToTemperatureNumber:', currentNumber);

        // Convert seed through temperatureToHumidityMaps
        let originalTemperatureToHumidityNumber = currentNumber;
        let foundTemperatureToHumidityNumbers = [];
        temperatureToHumidityMaps.forEach((map) => {
            if (map.sourceRanges.includes(currentNumber)) {
                const index = map.sourceRanges.indexOf(currentNumber);
                currentNumber = map.destinationRanges[index];
                foundTemperatureToHumidityNumbers.push(currentNumber);
                // console.log('transformed-TemperatureToHumidityNumber:', currentNumber);
            }
        });
        if(foundTemperatureToHumidityNumbers.length === 0) {
            foundTemperatureToHumidityNumbers.push(currentNumber);
        }
        currentNumber = getClosestValue(foundTemperatureToHumidityNumbers, originalTemperatureToHumidityNumber);
        console.log('current-TemperatureToHumidityNumber:', currentNumber);

        // Convert seed through humidityToLocationMaps
        let originalHumidityToLocationNumber = currentNumber;
        let foundHumidityToLocationNumbers = [];
        humidityToLocationMaps.forEach((map) => {
            if (map.sourceRanges.includes(currentNumber)) {
                const index = map.sourceRanges.indexOf(currentNumber);
                currentNumber = map.destinationRanges[index];
                foundHumidityToLocationNumbers.push(currentNumber);
                // console.log('transformed-HumidityToLocationNumber:', currentNumber);
            }
        });
        if(foundHumidityToLocationNumbers.length === 0) {
            foundHumidityToLocationNumbers.push(currentNumber);
        }
        currentNumber = getClosestValue(foundHumidityToLocationNumbers, originalHumidityToLocationNumber);

        console.log('current-HumidityToLocationNumber:', currentNumber);
        return currentNumber;
    }

// Iterate over each seed and find the corresponding location

let locations = [];
seeds.forEach((seed) => {
    const location = findCorrespondingLocation(seed);
    locations.push(location);
    console.log('-------------------------');
    console.log(`locations for seed ${seed} is: ${location}`);
    console.log('-------------------------');
    console.log('-------------------------');
    const answer = Math.min(...locations);
    console.log('answer:', answer);
});

// console.log('seedToSoilMaps:', seedToSoilMaps);
// console.log('fertilizerToWaterMaps:', fertilizerToWaterMaps);
// console.log('waterToLightMaps:', waterToLightMaps);
// console.log('lightToTemperatureMaps:', lightToTemperatureMaps);
// console.log('temperatureToHumidityMaps:', temperatureToHumidityMaps);
// console.log('humidityToLocationMaps:', humidityToLocationMaps);
//

// seeds.forEach((seed) => {
//     console.log('-------------------------');
//     console.log('seed:', seed);
//     let seedToSoilLocations = [];
//     seedToSoilMaps.forEach((seedToSoilMap, mapIndex) => {
//         if(seedToSoilMap.sourceRanges.includes(seed)) {
//             seedToSoilLocations.push(seedToSoilMap.destinationRanges[seedToSoilMap.sourceRanges.indexOf(seed)]);
//         }
//     });
//     if(seedToSoilLocations.length === 0) {
//         seedToSoilLocations.push(seed);
//     }
//     console.log('seedToSoilLocations:', seedToSoilLocations);
//
//     let soilToFertilizerLocations = [];
//     soilToFertilizerMaps.forEach((map, index) => {
//         if(map.sourceRanges.includes(seedToSoilLocations[index])) {
//             soilToFertilizerLocations.push(map.destinationRanges[index]);
//         }
//     });
//     if(soilToFertilizerLocations.length === 0) {
//         soilToFertilizerLocations = [...seedToSoilLocations];
//     }
//     console.log('soilToFertilizerLocations:', soilToFertilizerLocations);
//
//     let fertilizerToWaterLocations = [];
//     fertilizerToWaterMaps.forEach((map, index) => {
//         if(map.sourceRanges.includes(soilToFertilizerLocations[index])) {
//             fertilizerToWaterLocations.push(map.destinationRanges[map.sourceRanges[index]]);
//         }
//     });
//     if(fertilizerToWaterLocations.length === 0) {
//         fertilizerToWaterLocations = [...soilToFertilizerLocations];
//     }
//     console.log('fertilizerToWaterLocations:', fertilizerToWaterLocations);
//     //
//     // let waterToLightLocations = [];
//     // waterToLightMaps.forEach((map) => {
//     //     if(map.sourceRanges.includes(fertilizerToWaterLocations[fertilizerToWaterLocations.length - 1])) {
//     //         waterToLightLocations.push(map.destinationRanges[map.sourceRanges.indexOf(seed)]);
//     //         // console.log('map.destinationRanges[map.sourceRanges.indexOf(seed)]', map.destinationRanges[map.sourceRanges.indexOf(seed)]);
//     //         seed = map.destinationRanges[map.sourceRanges.indexOf(seed)];
//     //     }else {
//     //         waterToLightLocations.push(seed);
//     //     }
//     // });
//     // console.log('waterToLightLocations:', waterToLightLocations);
//     //
//     // let lightToTemperatureLocations = [];
//     // lightToTemperatureMaps.forEach((map) => {
//     //     if(map.sourceRanges.includes(waterToLightLocations[waterToLightLocations.length - 1])) {
//     //         lightToTemperatureLocations.push(map.destinationRanges[map.sourceRanges.indexOf(seed)]);
//     //         // console.log('map.destinationRanges[map.sourceRanges.indexOf(seed)]', map.destinationRanges[map.sourceRanges.indexOf(seed)]);
//     //         seed = map.destinationRanges[map.sourceRanges.indexOf(seed)];
//     //     }else {
//     //         lightToTemperatureLocations.push(seed);
//     //     }
//     // });
//     // console.log('lightToTemperatureLocations:', lightToTemperatureLocations);
//     //
//     // let temperatureToHumidityLocations = [];
//     // temperatureToHumidityMaps.forEach((map) => {
//     //     if(map.sourceRanges.includes(lightToTemperatureLocations[lightToTemperatureLocations.length - 1])) {
//     //         temperatureToHumidityLocations.push(map.destinationRanges[map.sourceRanges.indexOf(seed)]);
//     //         // console.log('map.destinationRanges[map.sourceRanges.indexOf(seed)]', map.destinationRanges[map.sourceRanges.indexOf(seed)]);
//     //         seed = map.destinationRanges[map.sourceRanges.indexOf(seed)];
//     //     }else {
//     //         temperatureToHumidityLocations.push(seed);
//     //     }
//     // });
//     // console.log('temperatureToHumidityLocations:', temperatureToHumidityLocations);
//     //
//     // let humidityToLocationLocations = [];
//     // humidityToLocationMaps.forEach((map) => {
//     //     if(map.sourceRanges.includes(temperatureToHumidityLocations[temperatureToHumidityLocations.length - 1])) {
//     //         humidityToLocationLocations.push(map.destinationRanges[map.sourceRanges.indexOf(seed)]);
//     //         // console.log('map.destinationRanges[map.sourceRanges.indexOf(seed)]', map.destinationRanges[map.sourceRanges.indexOf(seed)]);
//     //         seed = map.destinationRanges[map.sourceRanges.indexOf(seed)];
//     //     }else {
//     //         humidityToLocationLocations.push(seed);
//     //     }
//     // });
//     // console.log('humidityToLocationLocations:', humidityToLocationLocations);
//
//     console.log('-------------------------');
// });