import { useEffect, useState } from 'react';
import './App.css';
import constants from './constants';
import { randomIntFromInterval, sleep } from './utils';

const App = () => {

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(constants.arraySize.DEF_ARRAY_SIZE);
  const [swapCount, setSwapCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [nextIndex, setNextIndex] = useState(-1);
  const [sorted, setSorted] = useState(false);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortingDelay,setSortingDelay] = useState(constants.sortingDelay.DEF_DELAY);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    resetArray();
  }, [arraySize])


  const resetArray = () => {
    preSortRituals();
    const arr = [];
    const { MIN_ARRAY_VALUE, MAX_ARRAY_VALUE } = constants.arrayValue;

    for (let i = 0; i < arraySize; i++) {
      arr.push(randomIntFromInterval(MIN_ARRAY_VALUE, MAX_ARRAY_VALUE));
    }
    setArray(arr);
  }

  const mergeSort = () => {
    const jsSortedArr = [...array];
    jsSortedArr.sort((a, b) => a - b);
    setArray(jsSortedArr);
  }

  const quickSort = () => {
    alert('keep tryin');
   }

  const heapSort = () => {
    alert('bye bye birdie');
  }

  const bubbleSort = async () => {
    setIsRunning(true);
    const bubbleSortedArr = [...array];
    preSortRituals();
    for (let i = 0; i < bubbleSortedArr.length; i++) {
      // await sleep(10);
      for (let j = 0; j < bubbleSortedArr.length; j++) {
        setCurrentIndex(j);
        setNextIndex(j + 1);
        await sleep(sortingDelay);
        if (bubbleSortedArr[j] > bubbleSortedArr[j + 1]) {
          let temp = bubbleSortedArr[j];
          bubbleSortedArr[j] = bubbleSortedArr[j + 1];
          await sleep(sortingDelay);
          bubbleSortedArr[j + 1] = temp;
          await sleep(sortingDelay)
          setArray([...bubbleSortedArr]);
          await sleep(sortingDelay);
          setSwapCount(prevCount => prevCount + 1);
        }
        setComparisonCount(prevCount => (prevCount + 1));
      }
      setSortedIndex(prev => [...prev, bubbleSortedArr.length-1-i]);
    }
    setCurrentIndex(-1);
    setNextIndex(-1);
    setIsRunning(false);
  }

  const preSortRituals = () => {
    setSwapCount(0);
    setComparisonCount(0);
    setCurrentIndex(-1);
    setNextIndex(-1);
    setSortedIndex([]);
  }


  const selectBackgroundColor = (index) => {

    if(index === currentIndex){
      return '#EEEE0099';
    }
    if(index === nextIndex){
      return '#EEEE00AA';
    }

    if(sortedIndex.includes(index)){
      return 'green';
    }
    return 'orangered';
  }


  const handleSortingDelayChange = (e) => {
    setSortingDelay(e.target.value);
  }

  const handleArraySizeChange = (e) => {
    setArraySize(e.target.value);
  }

  return (
    <div>
      <div className="toolbar-container">
        <button onClick={resetArray} className='toolbar-button' disabled={isRunning}>Generate Array</button>
        <div className='array-size-tool'>
          <label className='array-size-label'>Array Size</label>
          <input type={'range'}
            className='array-size-slider'
            min={constants.arraySize.MIN_ARRAY_SIZE}
            value={arraySize}
            max={constants.arraySize.MAX_ARRAY_SIZE}
            onChange={handleArraySizeChange}
            disabled={isRunning}
          ></input>
        </div>
        <div className='sorting-speed-tool'>
          <label className='sorting-speed-label'>Sorting Delay</label>
          <input type={'range'}
            className='array-size-slider'
            min={constants.sortingDelay.MIN_DELAY}
            value={sortingDelay}
            max={constants.sortingDelay.MAX_DELAY}
            onChange={handleSortingDelayChange}
            disabled={isRunning}
          ></input>
        </div>
        <button className='toolbar-button' onClick={mergeSort} disabled={isRunning}>Merge Sort</button>
        <button className='toolbar-button' onClick={quickSort} disabled={isRunning}>Quick Sort</button>
        <button className='toolbar-button' onClick={heapSort} disabled={isRunning}>Heap Sort</button>
        <button className='toolbar-button' onClick={bubbleSort} disabled={isRunning}>Bubble Sort</button>
      </div>
      <div className="array-container">
        {array.map((value, index) => (
          <div
            className='array-bar'
            key={index}
            style={{
              height: `${value}px`,
              backgroundColor: selectBackgroundColor(index),
              // width: `${calculateBarWidth(arraySize)}px` 
            }}>
            {/* {value} */}
          </div>
        ))}
      </div>
      <div className='footer-container'>
        <div className='footer-app-info'> Sorting Visualizer Legend</div>
        <div className='color-legend'>
          <div className='default-bar'> Idle </div>
          <div className='sorting-bar'> Sorting </div>
          <div className='sorted-bar'> Sorted </div>
        </div>
        <div className='footer-array-size'> {`Array Size:${arraySize}`}
          <div>{`Comparisons:${comparisonCount}`}</div>
          <div>{`Swaps:${swapCount}`}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
