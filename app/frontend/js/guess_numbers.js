window.addEventListener('DOMContentLoaded', (_event) => {
  const keyBoardElements = document.querySelectorAll('[data-key-cell]')
  const guessRecordElement = document.getElementById('guessRecord')
  const winningMessageElement = document.getElementById('winningMessage')
  const winningMessageWrapElement = document.getElementById('winningMessageWrap')
  const roundCountElement = document.getElementById('roundCount')
  const restartButton = document.getElementById('restartButton')
  const CURRENT_BG_CLASS = 'bg-blue-500'
  const WILL_FILL_CLASS = 'bg-blue-300'
  let ansArray = new Array
  let currentDigtal = 1
  let roundCount = 1

  startGame()

  restartButton.addEventListener('click', startGame)
  
  function startGame(){
    ansArray = new Array
    currentDigtal = 1
    roundCount = 1
    createAns()
    resetEvents()
    resetElements()
    guessRecordElement.innerHTML = ''
    winningMessageWrapElement.classList.remove('show')
  }

  function createAns(){
    if(ansArray.length > 4) return

    var number = getRandomIntInclusive(1, 9)
    if (ansArray.includes(number)) createAns()
    ansArray.push(number)

    console.log(ansArray)
    if(ansArray.length < 3) createAns()
  }

  function resetEvents(){
    keyBoardElements.forEach(cell => {
      disableCell(cell, false)
      cell.classList.remove(WILL_FILL_CLASS)
      cell.classList.add(CURRENT_BG_CLASS)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
  }

  function resetElements(){
    resetDigtalElements()
    setRoundCountText()
  }

  function handleClick(e){
    const cell = e.target
    toggleMark(cell)
    disableCell(cell, true)
    setGuessArea(cell)
  }
  
  function toggleMark(cell){
    cell.classList.remove(CURRENT_BG_CLASS)
    cell.classList.add(WILL_FILL_CLASS)
  }

  function disableCell(cell, state){
    cell.disabled = state
  }

  function setGuessArea(cell){
    currentDigtalElement(currentDigtal).innerText = cell.innerText
    currentDigtal += 1
    if (currentDigtal == 4) checkWin()
  }
  
  function currentDigtalElement(index){
    return document.querySelector(`[data-digtal-${index}]`)
  }

  function checkWin(){
    var guessResult = ABArray(ansArray, getGuessArray())
    if (guessResult[0] === 3) endGame()

    nextRound(guessResult, getGuessArray())
  }

  function endGame(){
    winningMessageWrapElement.classList.add('show')
    winningMessageElement.innerText = `共花費 ${roundCount} 回`
  }

  function nextRound(guessResult, getGuessArray){
    currentDigtal = 1
    roundCount += 1

    setRoundCountText()
    addGuessRecord(guessResult, getGuessArray)
    resetEvents()
    resetElements()
  }

  function setRoundCountText(){
    return roundCountElement.innerText = `Round ${roundCount}`
  }

  function resetDigtalElements(){
    for(i=1; i < 4; i++){ currentDigtalElement(i).innerText = '' }
  }

  function addGuessRecord(guessResult, getGuessArray){
    return guessRecordElement.insertAdjacentHTML('beforeend', `
      <p class="px-5 py-2">${getGuessArray[0]}${getGuessArray[1]}${getGuessArray[2]}
      ------>${guessResult[0]} A ${guessResult[1]} B</p>`)
  }

  function getGuessArray(){
    var guessNumbers = new Array

    for(i=1; i < 4; i++){
      guessNumbers.push( parseInt( currentDigtalElement(i).innerText ) )
    }

    return guessNumbers
  }

  function ABArray(ansArray, guessArray){
    var a = 0
    var b = 0

    for(i=0; i < ansArray.length; i++){
      if (ansArray[i] == guessArray[i]){
	a++
      }else if ( ansArray.includes(guessArray[i]) ){
	b++
      }       
    }

    return [a, b]
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
  }
})
