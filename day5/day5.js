console.log('Hello day5');

const fs = require('fs');
const document = fs.readFileSync('day5.txt', 'UTF-8').split('\n').filter(line => line.trim() !== '');
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
seedToSoil = document.slice(searchSeedToSoilBegin + 1, searchSeedToSoilEnd).map(line => line.split(' ').map(Number))
soilToFertilizer = document.slice(searchSoilToFertilizerBegin + 1, searchSoilToFertilizerEnd).map(line => line.split(' ').map(Number));
fertilizerToWater = document.slice(searchFertilizerToWaterBegin + 1, searchFertilizerToWaterEnd).map(line => line.split(' ').map(Number));
waterToLight = document.slice(searchWaterToLightBegin + 1, searchWaterToLightEnd).map(line => line.split(' ').map(Number));
lightToTemperature = document.slice(searchLightToTemperatureBegin + 1, searchLightToTemperatureEnd).map(line => line.split(' ').map(Number));
temperatureToHumidity = document.slice(searchTemperatureToHumidityBegin + 1, searchTemperatureToHumidityEnd).map(line => line.split(' ').map(Number));
humidityToLocation = document.slice(searchHumidityToLocationBegin + 1, searchHumidityToLocationEnd).map(line => line.split(' ').map(Number));

function createRanges(line) {
    return {
        destinationRanges: createRange(line[0], line[2]),
        sourceRanges: createRange(line[1], line[2]),
    }
}
function createRange(rangeStart, rangeLength, batchSize = 150001) {
    if (rangeLength <= batchSize) {
        // Base case: Batch size is larger than range length
        let range = [];
        for (let i = rangeStart; i < rangeStart + rangeLength; i++) {
            range.push(i);
        }
        return range;
    } else {
        // Recursive case: Split range into batches recursively
        let range = [];
        const remainingRange = rangeLength - batchSize;
        range = range.concat(createRange(rangeStart, batchSize));
        if(remainingRange === 0) {return range;}
        range = range.concat(createRange(rangeStart + batchSize, remainingRange));
        return range;
    }
}

seedToSoilMaps= seedToSoil.map(line => createRanges(line));
soilToFertilizerMaps = soilToFertilizer.map(line => createRanges(line));
fertilizerToWaterMaps = fertilizerToWater.map(line => createRanges(line));
waterToLightMaps = waterToLight.map(line => createRanges(line));
lightToTemperatureMaps = lightToTemperature.map(line => createRanges(line));
temperatureToHumidityMaps = temperatureToHumidity.map(line => createRanges(line));
humidityToLocationMaps = humidityToLocation.map(line => createRanges(line));



function findCorrespondingLocation(seed) {
    const maps = [
        seedToSoilMaps,
        soilToFertilizerMaps,
        fertilizerToWaterMaps,
        waterToLightMaps,
        lightToTemperatureMaps,
        temperatureToHumidityMaps,
        humidityToLocationMaps
    ];

    const getClosestValue = (arr, target) =>
        arr.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev));

    let currentNumber = seed;

    for (let map of maps) {
        let foundNumbers = map.reduce((acc, { sourceRanges, destinationRanges }) => {
            const index = sourceRanges.indexOf(currentNumber);
            return index !== -1 ? acc.concat(destinationRanges[index]) : acc;
        }, []);

        if (foundNumbers.length === 0) {
            foundNumbers.push(currentNumber);
        }

        currentNumber = getClosestValue(foundNumbers, currentNumber);
    }

    return currentNumber;
}

// Iterate over each seed and find the corresponding location

let locations = [];
seeds.forEach((seed) => {
    const location = findCorrespondingLocation(seed);
    locations.push(location);
    // console.log('-------------------------');
    console.log(`locations for seed ${seed} is: ${location}`);
    // console.log('-------------------------');
    // console.log('-------------------------');

});
const answer = Math.min(...locations);
console.log('answer:', answer);
