//let score = document.querySelector('.scorecount')
//let lives = document.querySelector('.livescount')


const grid = document.querySelector('.grid')
const width = 18
const cells = []
let winston = 243
let ghost1 = 115
let ghost2 = 118
let ghost3 = 169
let ghost4 = 172
const walls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 27, 35, 36, 38, 39, 40, 41, 42, 44, 45, 47, 48, 49, 50, 51, 53, 54, 56, 57, 58, 59, 60, 62, 63, 65, 66, 67, 68, 69, 71, 72, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 114, 119, 125, 126, 127, 128, 129, 130, 132, 134, 135, 137, 139, 140, 141, 142, 143, 152, 153, 162, 163, 164, 165, 166, 168, 173, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 206, 207, 215, 216, 218, 219, 220, 222, 224, 225, 227, 229, 230, 231, 233, 234, 236, 237, 238, 240, 245, 247, 248, 249, 251, 252, 258, 259, 260, 261, 262, 263, 269, 270, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 287, 288, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323]
console.log(walls)
const chicken = [19, 34, 81, 199, 214, 321, 296]
const holdingArea = [115, 116, 117, 118, 133, 136, 150, 151, 154, 155, 169, 170, 171, 172]
let bones
// create grid

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



// winston movements
document.addEventListener('keydown', (event) => {
  const key = event.key

  if (key === 'ArrowRight' && !(winston % width === width - 1) && !(cells[winston + 1].classList.contains('walls')) && !(cells[winston + 1].classList.contains('holdingArea'))) {
    cells[winston].classList.remove('winston')
    winston += 1
    cells[winston].classList.add('winston')
  } else if (key === 'ArrowRight' && (winston === 161)) {
    cells[winston].classList.remove('winston')
    winston -= 17
    cells[winston].classList.add('winston')
  } else if (key === 'ArrowRight' && cells[winston + 1].classList.contains('walls')) {
    return
  } else if (key === 'ArrowLeft' && !(winston % width === 0) && !(cells[winston - 1].classList.contains('walls')) && !(cells[winston - 1].classList.contains('holdingArea'))) {
    cells[winston].classList.remove('winston')
    winston -= 1
    cells[winston].classList.add('winston')
  } else if (key === 'ArrowLeft' && (winston === 144)) {
    cells[winston].classList.remove('winston')
    winston += 17
    cells[winston].classList.add('winston')
  } else if (key === 'ArrowDown' && !(winston + width >= width ** 2) && !(cells[winston + width].classList.contains('walls'))) {
    cells[winston].classList.remove('winston')
    winston += width
    cells[winston].classList.add('winston')
  } else if (key === 'ArrowUp' && !(winston < width) && !(cells[winston - width].classList.contains('walls'))) {
    cells[winston].classList.remove('winston')
    winston -= width
    cells[winston].classList.add('winston')
  }
})

/*
Random ghost movements
- randomly moves in a continous direction until the ghost hits a wall then changes direction
*/
