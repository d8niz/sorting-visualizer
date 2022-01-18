import constants from './constants'

/*
Return random int from a given interval [min,max]
*/
const randomIntFromInterval = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

/*
Maps interval [a,b] to [c,d] linearly
f(t) = c + (d-c)/(b-a) * (t - c)

Tried to reverse-map arraySize[50,350] to array div width [2,30] pixels,
so when array size is going up array width goes down
*/
const calculateBarWidth = (arraySize) => {

    const maxBarWidth = 30;
    const minBarWidth = 2;

    const {MAX_ARRAY_SIZE, MIN_ARRAY_SIZE} = constants.arraySize;
    const curr = Math.abs(arraySize - 400)

    return minBarWidth + (((maxBarWidth - minBarWidth) / (MAX_ARRAY_SIZE - MIN_ARRAY_SIZE)) * (curr - MIN_ARRAY_SIZE));

}


const sleep = (msecs) => {
    return new Promise(resolve => setTimeout(resolve,msecs));
}

export {randomIntFromInterval, calculateBarWidth, sleep};
