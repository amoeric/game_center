window.addEventListener('DOMContentLoaded', (_event) => {
  const sudoCellElements = document.querySelectorAll('[data-sudo-cell]')
  const digitalBoxCellElements = document.querySelectorAll('.digital-cell')
  const winningMessageTextElement = document.getElementById('winningMessage')
  const restartButtonElement = document.getElementById('restartButton')
  const FILL_CLASS = 'doing-fill-in'
  const QUESTION_CLASS = 'question-cell'
  const WRITTEN_CLASS = 'written-cell'
  const ALL_CELL_COUNT = 81
  const NINE_CELL_SUM_NUMBER = 45

  const QUESTION = 
//   [
//     0, 6, 0, 4, 9, 0, 0, 0, 0,
//     5, 0, 1, 0, 0, 0, 0, 4, 7,
//     0, 0, 0, 7, 0, 0, 5, 6, 0,
//     0, 5, 8, 1, 3, 0, 0, 0, 0,
//     0, 0, 0, 5, 0, 0, 0, 0, 4,
//     6, 0, 9, 0, 7, 0, 3, 0, 0,
//     0, 7, 5, 2, 0, 6, 4, 3, 9,
//     0, 0, 0, 9, 0, 8, 0, 0, 1,
//     9, 1, 2, 3, 0, 7, 8, 5, 0,
//   ]

  [
    3, 6, 7, 4, 9, 5, 1, 2, 8,
    5, 8, 1, 6, 2, 3, 9, 4, 7,
    2, 9, 4, 7, 8, 1, 5, 6, 3,

    7, 5, 8, 1, 3, 4, 6, 9, 2,
    1, 2, 3, 5, 6, 9, 7, 8, 4,
    6, 4, 9, 8, 7, 2, 3, 1, 5,

    8, 7, 5, 2, 1, 6, 4, 3, 9,
    4, 3, 6, 9, 5, 8, 2, 7, 1,
    9, 1, 2, 3, 4, 7, 8, 5, 0
  ]
  let currentNumber = 0


  startGame()

  function startGame(){
    cleanBoard()
    setDefaultEvent()    
    setQuestion()
  }

  function setQuestion(){
    for(let index = 0; index <= sudoCellElements.length; index++) {
      if(QUESTION[index] != 0){
        sudoCellElements[index].innerText = QUESTION[index]
        sudoCellElements[index].classList.add(QUESTION_CLASS)
      }
    }
  }

  function cleanBoard(){
    sudoCellElements.forEach(cell =>{
      cell.innerText = ""
    })
  }
  function setDefaultEvent(){
    setRestartClickEvent()
    setDigitialBoxClickEvent()    
    setCellClickEvent()
  }

  function setCellClickEvent(){
    sudoCellElements.forEach(cell => {
      cell.removeEventListener('click', handleClick)        
      cell.addEventListener('click', handleClick)
    })
  }

  function handleClick(e){
    const cell = e.target
    removeMark()
    placeMark(cell)
    changeCellText(cell)
    checkWin()
  }

  function removeMark(){
    sudoCellElements.forEach(cell => {
      cell.classList.remove(FILL_CLASS)
    })
  }

  function placeMark(cell){
    cell.classList.add(FILL_CLASS)
  }

  function changeCellText(cell){
    if (isQuestionText(cell)) return 
    if (currentNumber == 0) return 
    
    cell.innerText = currentNumber
    cell.classList.add(WRITTEN_CLASS)
  }

  function setDigitialBoxClickEvent(){
    digitalBoxCellElements.forEach(cell => {
      cell.removeEventListener('click', boxHandleClick)
      cell.addEventListener('click', boxHandleClick)
    })
  } 

  function setRestartClickEvent(){
    restartButtonElement.addEventListener('click', function(e){
      winningMessageTextElement.classList.remove('show')
      startGame()
    })
  }

  function boxHandleClick(e){
    const cell = e.target
    changeCurrentNumber(cell)
  }
  function changeCurrentNumber(cell){
    currentNumber = cell.innerText
  }



  function checkWin(){
    //相加等於45並且都有填入
    //橫列1-9、直列1-9、九大方格1-9
    let writtenSelectorLength = parseInt(document.querySelectorAll(`.${WRITTEN_CLASS}`).length)
    let questionSelectorLength = parseInt(document.querySelectorAll(`.${QUESTION_CLASS}`).length)

    if (ALL_CELL_COUNT > writtenSelectorLength + questionSelectorLength) return

    let rowOneIndex =   [0,  1,  2,  3,  4,  5,  6,  7,  8]
    let rowTwoIndex =   [9,  10, 11, 12, 13, 14, 15, 16, 17]
    let rowThreeIndex = [18, 19, 20, 21, 22, 23, 24, 25, 26]
    let rowFourIndex =  [27, 28, 29, 30, 31, 32, 33, 34, 35]
    let rowFiveIndex =  [36, 37, 38, 39, 40, 41, 42, 43, 44]
    let rowSixIndex =   [45, 46, 47, 48, 49, 50, 51, 52, 53]
    let rowSevenIndex = [54, 55, 56, 57, 58, 59, 60, 61, 62]
    let rowEightIndex = [63, 64, 65, 66, 67, 68, 69, 70, 71]
    let rowNineIndex =  [72, 73, 74, 75, 76, 77, 78, 79, 80]

    let columnOneIndex =   [0, 9,  18, 27, 36, 45, 54, 63, 72]
    let columnTwoIndex =   [1, 10, 19, 28, 37, 46, 55, 64, 73]
    let columnThreeIndex = [2, 11, 20, 29, 38, 47, 56, 65, 74]
    let columnFourIndex =  [3, 12, 21, 30, 39, 48, 57, 66, 75]
    let columnFiveIndex =  [4, 13, 22, 31, 40, 49, 58, 67, 76]
    let columnSixIndex =   [5, 14, 23, 32, 41, 50, 59, 68, 77]
    let columnSevenIndex = [6, 15, 24, 33, 42, 51, 60, 69, 78]
    let columnEightIndex = [7, 16, 25, 34, 43, 52, 61, 70, 79]
    let columnNineIndex =  [8, 17, 26, 35, 44, 53, 62, 71, 80]

    let squareOneIndex =   [0,  1,  2,  9,  10, 11, 18, 19, 20]
    let squareTwoIndex =   [3,  4,  5,  12, 13, 14, 21, 22, 23]
    let squareThreeIndex = [6,  7,  8,  15, 16, 17, 24, 25, 26]
    let squareFourIndex =  [27, 28, 29, 36, 37, 38, 45, 46, 47]
    let squareFiveIndex =  [30, 31, 32, 39, 40, 41, 48, 49, 50]
    let squareSixIndex =   [33, 34, 35, 42, 43, 44, 51, 52, 53]
    let squareSevenIndex = [54, 55, 56, 63, 64, 65, 72, 73, 74]
    let squareEightIndex = [57, 58, 59, 66, 67, 68, 75, 76, 77]
    let squareNineIndex =  [60, 61, 62, 69, 70, 71, 78, 79, 80]
    
    //各九宮格加總等於45
    

    if (
        (eqNineCellSumNumber(rowOneIndex) && eqNineCellSumNumber(rowTwoIndex) && eqNineCellSumNumber(rowNineIndex))
        &&
        (eqNineCellSumNumber(columnOneIndex) && eqNineCellSumNumber(columnTwoIndex) && eqNineCellSumNumber(columnThreeIndex))
    )
    {
      winningMessageTextElement.classList.add('show')
    }


  }

  function eqNineCellSumNumber(array){
    return sumCellTextArray(array) == NINE_CELL_SUM_NUMBER
  }
  function sumCellTextArray(array){
    let n = 0
    for (let index = 0; index < 9; index++) {
      n+= parseInt(sudoCellElements[array[index]].textContent)
    }    
    return n
  }

  function isQuestionText(cell){
    return cell.classList.contains(QUESTION_CLASS)
  }
})