//set all these into a winstonGame()function

const grid = document.querySelector('.grid')
const width = 18
const cells = []
const holdingArea = [115, 116, 117, 118, 133, 136, 150, 151, 154, 155, 169, 170, 171, 172]
const ghostCells = ['ghost1', 'ghost2', 'ghost3', 'ghost4']
let winston = 243
let ghost1 = 115
let ghost2 = 118
let ghost3 = 169
let ghost4 = 172
const blueghost = document.querySelector('.blueghost')
const ghostDirection = [+1, -1, width, -width]
const walls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 27, 35, 36, 38, 39, 40, 41, 42, 44, 45, 47, 48, 49, 50, 51, 53, 54, 56, 57, 58, 59, 60, 62, 63, 65, 66, 67, 68, 69, 71, 72, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 114, 119, 125, 126, 127, 128, 129, 130, 132, 134, 135, 137, 139, 140, 141, 142, 143, 152, 153, 162, 163, 164, 165, 166, 168, 173, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 206, 207, 215, 216, 218, 219, 220, 222, 224, 225, 227, 229, 230, 231, 233, 234, 236, 237, 238, 240, 245, 247, 248, 249, 251, 252, 258, 259, 260, 261, 262, 263, 269, 270, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 287, 288, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323]
const chicken = [19, 34, 81, 199, 214, 321, 296]
let bones
const scoreCount = document.querySelector('.scorecount')
let score = 0
const livesCount = document.querySelector('.livescount')
let lives = 3
lives.innerHTML = 3
const start = document.querySelector('.start')

// ? create grid
for (let index = 0; index < width ** 2; index++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  if (index === winston) {
    cell.classList.add('winston')
  } else if (index === ghost1) {
    cell.classList.add('ghost1')
  } else if (index === ghost2) {
    cell.classList.add('ghost2')
  } else if (index === ghost3) {
    cell.classList.add('ghost3')
  } else if (index === ghost4) {
    cell.classList.add('ghost4')
  } else if (walls.includes(index)) {
    cell.classList.add('walls')
  } else if (chicken.includes(index)) {
    cell.classList.add('chicken')
  } else if (holdingArea.includes(index)) {
    cell.classList.add('holdingArea')
  } else {
    cell.classList.add('bones')
  }
  grid.appendChild(cell)
  cells.push(cell)
  cell.innerHTML = index

  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / width}%`
}

// winston movements with eating bones & chickens
document.addEventListener('keydown', (event) => {
  const key = event.key

  if (key === 'ArrowRight' && !(winston % width === width - 1) && !(cells[winston + 1].classList.contains('walls')) && !(cells[winston + 1].classList.contains('holdingArea'))) {
    cells[winston].classList.remove('winston')
    winston += 1
    if (cells[winston].classList.contains('bones')) {
      cells[winston].classList.remove('bones')
      score += 10
      scoreCount.innerHTML = score
    } else if (cells[winston].classList.contains('chicken')) {
      cells[winston].classList.remove('chicken')
      score += 25
      scoreCount.innerHTML = score
      cells[ghost1].classList.add('blueghost')
      setBlueGhosts()
    } else if ((cells[winston].classList.contains('ghost1') || cells[winston].classList.contains('ghost2') || cells[winston].classList.contains('ghost3') || cells[winston].classList.contains('ghost4'))) { // add other ghsots
      cells[ghost1].classList.remove('winston')
      lives -= 1
      livesCount.innerHTML = lives
      checkLives()
    }
    cells[winston].classList.add('winston')
  } else if (key === 'ArrowRight' && (winston === 161)) {
    cells[winston].classList.remove('winston')
    winston -= 17
    if (cells[winston].classList.contains('bones')) {
      cells[winston].classList.remove('bones')
      score += 10
      scoreCount.innerHTML = score
    } else if (cells[winston].classList.contains('chicken')) {
      cells[winston].classList.remove('chicken')
      score += 25
      scoreCount.innerHTML = score
    }
    cells[winston].classList.add('winston')
  } else if (key === 'ArrowLeft' && !(winston % width === 0) && !(cells[winston - 1].classList.contains('walls')) && !(cells[winston - 1].classList.contains('holdingArea'))) {
    cells[winston].classList.remove('winston')
    winston -= 1
    if (cells[winston].classList.contains('bones')) {
      cells[winston].classList.remove('bones')
      score += 10
      scoreCount.innerHTML = score
    } else if (cells[winston].classList.contains('chicken')) {
      cells[winston].classList.remove('chicken')
      score += 25
      scoreCount.innerHTML = score
      setBlueGhosts()
    } else if (cells[winston].classList.contains('ghost1') || cells[winston].classList.contains('ghost2') || cells[winston].classList.contains('ghost3') || cells[winston].classList.contains('ghost4')) { //add other ghosts
      cells[ghost1].classList.remove('winston')
      lives -= 1
      livesCount.innerHTML = lives
      checkLives()
    }
    cells[winston].classList.add('winston')
  } else if (key === 'ArrowLeft' && (winston === 144)) {
    cells[winston].classList.remove('winston')
    winston += 17
    if (cells[winston].classList.contains('bones')) {
      cells[winston].classList.remove('bones')
      score += 10
      scoreCount.innerHTML = score
      cells[winston].classList.add('winston')
    }
  } else if (key === 'ArrowDown' && !(winston + width >= width ** 2) && !(cells[winston + width].classList.contains('walls'))) {
    cells[winston].classList.remove('winston')
    winston += width
    if (cells[winston].classList.contains('bones')) {
      cells[winston].classList.remove('bones')
      score += 10
      scoreCount.innerHTML = score
    } else if (cells[winston].classList.contains('chicken')) {
      cells[winston].classList.remove('chicken')
      score += 25
      scoreCount.innerHTML = score
      setBlueGhosts()
    } else if (cells[winston].classList.contains('ghost1') || cells[winston].classList.contains('ghost2') || cells[winston].classList.contains('ghost3') || cells[winston].classList.contains('ghost4')) { //add other ghosts
      cells[ghost1].classList.remove('winston')
      lives -= 1
      livesCount.innerHTML = lives
      checkLives()
    }
    cells[winston].classList.add('winston')

  } else if (key === 'ArrowUp' && !(winston < width) && !(cells[winston - width].classList.contains('walls'))) {
    cells[winston].classList.remove('winston')
    winston -= width
    if (cells[winston].classList.contains('bones')) {
      cells[winston].classList.remove('bones')
      score += 10
      scoreCount.innerHTML = score
    } else if (cells[winston].classList.contains('chicken')) {
      cells[winston].classList.remove('chicken')
      score += 25
      scoreCount.innerHTML = score
      setBlueGhosts()
    } else if (cells[winston].classList.contains('ghost1') || cells[winston].classList.contains('ghost2') || cells[winston].classList.contains('ghost3') || cells[winston].classList.contains('ghost4')) { //add other ghosts
      cells[ghost1].classList.remove('winston')
      lives -= 1
      livesCount.innerHTML = lives
      checkLives()
    }
    cells[winston].classList.add('winston')
  }
  console.log(score)
})

/*
Random ghost movements
- randomly moves in a continuous direction until the ghost hits a wall then changes direction
if applicable: replaces bones or chicken with ghost class then goes back to chick 
*/

function ghost1RandomMovements() {
  console.log('hello')
  let direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
  const ghost1Interval = setInterval(() => {
    if (!cells[ghost1 + direction].classList.contains(ghost2) && !cells[ghost1 + direction].classList.contains('walls') && !cells[ghost1 + direction].classList.contains('holdingArea')) {
      if (cells[ghost1].classList.contains('blueghost')) {
        cells[ghost1].classList.remove('ghost1', 'blueghost')
        ghost1 += direction
        cells[ghost1].classList.add('ghost1', 'blueghost')
      } else {
        cells[ghost1].classList.remove('ghost1')
        ghost1 += direction
        cells[ghost1].classList.add('ghost1')
      }
    } else direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
  }, 500)
}

function ghost2RandomMovements() {
  console.log('hello2')
  let direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
  const ghost2Interval = setInterval(() => {
    if (!cells[ghost2 + direction].classList.contains(ghost1) && !cells[ghost2 + direction].classList.contains('walls') && !cells[ghost2 + direction].classList.contains('holdingArea')) {
      if (cells[ghost2].classList.contains('blueghost')) {
        cells[ghost2].classList.remove('ghost2', 'blueghost')
        ghost2 += direction
        cells[ghost2].classList.add('ghost2', 'blueghost')
      } else {
        cells[ghost2].classList.remove('ghost2')
        ghost2 += direction
        cells[ghost2].classList.add('ghost2')
      }
    } else direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
  }, 500)
}

function ghost3RandomMovements() {
  console.log('hello3')
  let direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
  const ghost3Interval = setInterval(() => {
    if (!cells[ghost3 + direction].classList.contains(ghost4) && !cells[ghost3 + direction].classList.contains('walls') && !cells[ghost3 + direction].classList.contains('holdingArea')) {
      if (cells[ghost3].classList.contains('blueghost')) {
        cells[ghost3].classList.remove('ghost3', 'blueghost')
        ghost3 += direction
        cells[ghost3].classList.add('ghost3', 'blueghost')
      } else {
        cells[ghost3].classList.remove('ghost3')
        ghost3 += direction
        cells[ghost3].classList.add('ghost3')
      }
    } else direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
  }, 500)
}

function ghost4RandomMovements() {
  console.log('hello4')
  let direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
  const ghost4Interval = setInterval(() => {
    if (!cells[ghost4 + direction].classList.contains(ghost3) && !cells[ghost4 + direction].classList.contains('walls') && !cells[ghost4 + direction].classList.contains('holdingArea')) {
      if (cells[ghost4].classList.contains('blueghost')) {
        cells[ghost4].classList.remove('ghost4', 'blueghost')
        ghost4 += direction
        cells[ghost4].classList.add('ghost4', 'blueghost')
      } else {
        cells[ghost4].classList.remove('ghost4')
        ghost4 += direction
        cells[ghost4].classList.add('ghost4')
      }
    } else direction = ghostDirection[Math.floor(Math.random() * ghostDirection.length)]
  }, 500)
}




// ghost 1 out of holding
function moveLeft() {
  if (ghost1 === 151) {
    const leftInterval = setInterval(() => {
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= 1
      cells[ghost1].classList.add('ghost1')
    }, 500, 2)
    setTimeout(() => {
      clearInterval(leftInterval)
    }, 1000)
  }
}

// ghost 2 out of holding
function moveRight() {
  if (ghost2 === 154) {
    const rightInterval = setInterval(() => {
      cells[ghost2].classList.remove('ghost2')
      ghost2 += 1
      cells[ghost2].classList.add('ghost2')
    }, 500, 2)
    setTimeout(() => {
      clearInterval(rightInterval)
    }, 1000)
  }
}

// ghost 3 out of holding
function moveLeft3() {
  if (ghost3 === 151) {
    const leftInterval3 = setInterval(() => {
      cells[ghost3].classList.remove('ghost3')
      ghost3 -= 1
      cells[ghost3].classList.add('ghost3')
    }, 500, 2)
    setTimeout(() => {
      clearInterval(leftInterval3)
    }, 1000)
  }
}

// get ghost4 out of holding
function moveRight4() {
  if (ghost4 === 154) {
    const rightInterval4 = setInterval(() => {
      cells[ghost4].classList.remove('ghost4')
      ghost4 += 1
      cells[ghost4].classList.add('ghost4')
    }, 500, 2)
    setTimeout(() => {
      clearInterval(rightInterval4)
    }, 1000)
  }
}

// get all ghost out of holding and moving randomly on start click
function moveGhost1() {
  const downInterval = setInterval(() => {
    cells[ghost1].classList.remove('ghost1')
    ghost1 += 18
    cells[ghost1].classList.add('ghost1')
  }, 500, 2)
  setTimeout(() => {
    clearInterval(downInterval)
    moveLeft()
  }, 1000)
  console.log('move')
  ghost1RandomMovements()
}

function moveGhost2() {
  const downInterval2 = setInterval(() => {
    cells[ghost2].classList.remove('ghost2')
    ghost2 += 18
    cells[ghost2].classList.add('ghost2')
  }, 500, 2)
  setTimeout(() => {
    clearInterval(downInterval2)
    moveRight()
  }, 1000)
  console.log('move2')
  ghost2RandomMovements()
}
function moveGhost3() {
  const upInterval3 = setInterval(() => {
    cells[ghost3].classList.remove('ghost3')
    ghost3 -= 18
    cells[ghost3].classList.add('ghost3')
  }, 1500, 1)
  setTimeout(() => {
    clearInterval(upInterval3)
    moveLeft3()
  }, 2500)
  console.log('move3')
  ghost3RandomMovements()
}
function moveGhost4() {
  const upInterval4 = setInterval(() => {
    cells[ghost4].classList.remove('ghost4')
    ghost4 -= 18
    cells[ghost4].classList.add('ghost4')
  }, 1500, 1)
  setTimeout(() => {
    clearInterval(upInterval4)
    moveRight4()
  }, 2500)
  console.log('move4')
  ghost4RandomMovements()
}

start.addEventListener('click', () => {
  moveGhost1()
  moveGhost2()
  moveGhost3()
  moveGhost4()
})


// blue ghost timer for ghosts. current issues 
function setBlueGhosts() {
  if (cells[winston].classList.contains('chicken')) {
    const blueGhostTimer = setInterval(() => {
      console.log('hello')
      cells[ghost1].classList.add('blueghost')
      cells[ghost2].classList.add('blueghost')
      cells[ghost3].classList.add('blueghost')
      cells[ghost4].classList.add('blueghost')
      if (cells[winston].classList.contains('blueghost')) {
        cells[winston].classList.remove('blueghost')
        score += 50
        scoreCount.innerHTML = score
        if (cells[winston].classList.contains('ghost1')) {
          cells[winston].classList.remove('ghost1')
          ghost1 = 115
          moveGhost1()
        } else if (cells[winston].classList.contains('ghost2')) {
          cells[winston].classList.remove('ghost2')
          ghost2 = 118
          moveGhost2()
        } else if (cells[winston].classList.contains('ghost3')) {
          cells[winston].classList.remove('ghost3')
          ghost3 = 169
          moveGhost3()
        } else if (cells[winston].classList.contains('ghost4')) {
          cells[winston].classList.remove('ghost4')
          ghost4 = 172
          moveGhost3()
        }
      }
    }, 5000, 14)
    setTimeout(() => {
      clearInterval(blueGhostTimer)
      cells[ghost1].classList.remove('blueghost')
    }, 7000)
  }
}


// check lives
function checkLives() {
  if (lives === 0) {
    alert(`Thanks for playing! Your score was ${score}!`)
  } else {
    winston = 243
  }
}

