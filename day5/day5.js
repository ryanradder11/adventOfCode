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
fertilizerToWater = document.slice(searchFertilizerToWaterBegin + 1, searchFertilizerToWaterEnd);
waterToLight = document.slice(searchWaterToLightBegin + 1, searchWaterToLightEnd);
lightToTemperature = document.slice(searchLightToTemperatureBegin + 1, searchLightToTemperatureEnd);
temperatureToHumidity = document.slice(searchTemperatureToHumidityBegin + 1, searchTemperatureToHumidityEnd);
humidityToLocation = document.slice(searchHumidityToLocationBegin + 1, searchHumidityToLocationEnd);



console.log('seedToSoil:', seedToSoil);

console.log('soilToFertilizer:', soilToFertilizer);
console.log('fertilizerToWater:', fertilizerToWater);
