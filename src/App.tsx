//******************************************//
//                                          //
//      "Match The Tiles" by PapaProger     //
//                                          //
//          version 1.1, 19.04.2022         //
//                                          //
//******************************************//

import {useState} from 'react'
import './App.css'
// import {v1} from 'uuid' // не используем влоб
import Tile from './Tile'

// Плашка
export type TileType = {
  id: string // формируем исходя из положения в двухмерном массиве
  // знаем свою позицию в двухмерном массиве
  rowIndex: number
  columnIndex: number
  // значение
  value: number
  // лицевая ли сторона
  isTurnedOver: boolean
  // открыта (сыграна) ли в паре
  isOpened: boolean
}

// Генерирует число в заданном диапазоне
function getRandomValue (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Перемешивает элементы массива
function getMixedArray (array: Array<number>): Array<number> {

  let arrayCopy = [...array]

  for (let i = 0; i < arrayCopy.length - 1; i++) {
    let r1 = getRandomValue(0, arrayCopy.length - 1)
    let r2 = getRandomValue(0, arrayCopy.length - 1)
    let n = arrayCopy[r1]
    arrayCopy[r1] = arrayCopy[r2]
    arrayCopy[r2] = n
  }

  return arrayCopy
}

// Генерирует массив плашек
function tileFabric (rowNumber: number, columnNumber: number): Array<Array<TileType>> {

  // принудительное четное их количество
  if ((rowNumber * columnNumber) % 2 !== 0) columnNumber++

  let halfArray = new Array<number>(rowNumber * columnNumber / 2)
  let masterArray = new Array<Array<TileType>>(rowNumber)
  let slaveArray = new Array<TileType>(columnNumber)

  // генерируем одномерный полумассив случайных чисел
  for (let i = 0; i < halfArray.length; i++) halfArray[i] = getRandomValue(1, 99)
  
  // порождаем одномерный массив значений плашек
  let fullArray = getMixedArray([...halfArray, ...getMixedArray(halfArray)])

  // порождаем двухмерный массив плашек с парными случайными значениями
  for (let i = 0; i < rowNumber; i++) {
    for (let j = 0; j < columnNumber; j++) {
      slaveArray[j] = {id: i.toString() + '-' + j.toString(), rowIndex: i, columnIndex: j,
      value: fullArray[i*columnNumber + j], isTurnedOver: false, isOpened: false}
    }
    masterArray[i] = [...slaveArray] // (!)
  }

  return masterArray
}

// Храним текущие плашки
let currentTiles = new Array<TileType>(3)
// Считаем клики
let papaCounts = 0

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

function App() {

  // Храним состояние двухмерного массива плашек + задаем размеры игрового поля прямо тут
  let [tiles, setTiles] = useState(tileFabric(5, 10))

  // Обработчик кликов
  function clickHandler (ri: number, ci: number): void {

    let tilesCopy = [...tiles]

    currentTiles[papaCounts++] = tiles[ri][ci] /// запоминаю именно ссылку!

    if (papaCounts === 3) {

      // совпадает ли открытая пара плашек
      if (currentTiles[0].value !== currentTiles[1].value) {
        tilesCopy[currentTiles[0].rowIndex][currentTiles[0].columnIndex].isTurnedOver = false
        tilesCopy[currentTiles[1].rowIndex][currentTiles[1].columnIndex].isTurnedOver = false
      } else {
        tilesCopy[currentTiles[0].rowIndex][currentTiles[0].columnIndex].isOpened = true
        tilesCopy[currentTiles[1].rowIndex][currentTiles[1].columnIndex].isOpened = true
      }
        
      currentTiles[0] = currentTiles[2]
      papaCounts = 1
    }

    // tilesCopy.map(ta => ta.map(t => { if(t.id === id) t.isTurnedOver = true })) // оставил это тут
    tilesCopy[ri][ci].isTurnedOver = true
    setTiles(tilesCopy)
  }

  // Отрисовка
  return (
    <div className="App">
      <div>
        {tiles.map(ta =>
          (<div className='tiles-row-wrapper'>{ta.map(t =>
            (<Tile key={t.id} tile={t} clickHandler={clickHandler}/>))}</div>))}
      </div>
    </div>
  )
}

export default App