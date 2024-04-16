
function init() {  

    const container = document.querySelector('.container')
    const width = 20
    const cellCount = width * width
    const cells = []
  
    // Create grid cells
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.id = `cell-${i}`
      cell.classList.add('grid')
      container.appendChild(cell)
      cells.push(cell)
    }
  
    let snakeBody = [202]
    let apple = [Math.floor(Math.random() * cells.length)]
    let lastLoadingTime = 0
    let scoreBoard = 0
    let snakeSpeed = 3
    let gameOver = false
    const scoreDisplay = document.querySelector('span')
    const speedDisplay = document.querySelector('.speed')
    const gameOverSound = document.querySelector('#gameover-audio')
    const appleEatingSound = document.querySelector('#apple-audio')
  
  
    // Initialize snake and apple on the grid
    snakeBody.forEach((idNumber) => {                                                                                                                                    
      const cell = document.querySelector('#cell-' + idNumber)
      cell.classList.add('snake')
    })
    apple.forEach((idNumber) => {
      const cell = document.querySelector('#cell-' + idNumber)
      cell.classList.add('apple') 
    })
  
    const up = 38
    const right = 39
    const down = 40
    const left = 37
  
    function reset() {
      // Reset game state
      snakeBody = [202]
      apple = [Math.floor(Math.random() * 399)]
      lastLoadingTime = 0
      scoreBoard = 0
      snakeSpeed = 3
      gameOver = false
      let gridsInnerHTML = "" // clear grid
      for (let i = 0; i < 400; i++) {
        gridsInnerHTML += "<div id="+ 'cell' +  "-" + i + " class='grid'></div>"
      }
      document.querySelector('.container').innerHTML = gridsInnerHTML
      snakeBody.forEach((idNumber) => {                                                                                                                                    
        const cell = document.querySelector('#cell-' + idNumber)
        cell.classList.add('snake');
      });
      apple.forEach((idNumber) => {
        const cell = document.querySelector('#cell-' + idNumber)
        cell.classList.add('apple') 
      });
      document.querySelector('#gameOver').style.visibility = 'hidden'
    }
  
    function snakeMovement(direction){
      console.log(direction)
  
  
      const snakeHead = snakeBody[snakeBody.length - 1]
      // const snakeTail = snakeBody[0]
      let newSnakeHead;
  
      if(direction === up){
        if (snakeHead - width < 0) {
          newSnakeHead = snakeHead + cellCount - width
        } else {
          newSnakeHead = snakeHead - width
        }
      } else if(direction === right){
        if (snakeHead % width === width - 1) {
          newSnakeHead = snakeHead - width + 1
        } else {
          newSnakeHead = snakeHead + 1
        }  
      } else if(direction === down){
        if (snakeHead + width >= cellCount) {
          newSnakeHead = snakeHead - cellCount + width 
        } else {
          newSnakeHead = snakeHead + width
        }
      } else if(direction === left){
        if (snakeHead % width === 0) {
          newSnakeHead = snakeHead + width - 1
        } else {
          newSnakeHead = snakeHead - 1
        }
      }
  
      const isEatingAnApple = document.querySelector(`#cell-${newSnakeHead}`).classList.contains('apple')
      if (isEatingAnApple) {
        document.querySelector(`#cell-${newSnakeHead}`).classList.remove('apple')
  
        const willGrow = true;
        apple.shift(newSnakeHead)
        appleEatingSound.play('#apple-audio') // Play eating sound
  
  
        scoreBoard ++
        scoreDisplay.innerText = scoreBoard
        snakeSpeed ++
        speedDisplay.innerText = snakeSpeed
  
  
        let randomId = Math.floor(Math.random() * 399);
        while (snakeBody.includes(randomId)) {
          randomId = Math.floor(Math.random() * 399);
        }
        apple = [randomId];
      document.querySelector(`#cell-${randomId}`).classList.add('apple');
  
        appleEatingSound.play('#apple-audio'); // Play eating sound
      } else {
        // If not eating an apple, move the snake normally
        const snakeTail = snakeBody.shift(); // Remove the tail
        document.querySelector(`#cell-${snakeTail}`).classList.remove('snake');
      }
  
  
        const isEatingItself = document.querySelector(`#cell-${newSnakeHead}`).classList.contains('snake')
        if (isEatingItself) {
          gameOver = true
          document.querySelector('#gameOver').style.visibility = 'visible' 
          document.querySelector('#restart').addEventListener('click', () => {reset()})
          gameOverSound.play('#gameover-audio')
        }
      snakeBody.push(newSnakeHead)
      document.querySelector(`#cell-${newSnakeHead}`).classList.add('snake')
  
    }
  
    let currentDirection = up
    function updateDirection(e) {
      if(e.keyCode === up){
        currentDirection = up
      } else if(e.keyCode === right){
        currentDirection = right
      } else if(e.keyCode === down){
        currentDirection = down
      } else if(e.keyCode === left){
        currentDirection = left
      }
    }
  
    function main(currentTime) {
      window.requestAnimationFrame(main)
      const secsSinceLastLoading = (currentTime - lastLoadingTime) / 1000
      if(secsSinceLastLoading < 1 / snakeSpeed) return
      console.log('loading')
      lastLoadingTime = currentTime
      if (!gameOver) {
        snakeMovement(currentDirection)
      }
    } 
    window.requestAnimationFrame(main)
  
    document.addEventListener('keydown', updateDirection)
  }
  
  window.addEventListener('DOMContentLoaded', init)