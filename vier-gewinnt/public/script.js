const SERVICE = 'http://localhost:3000/api/data/c4state?api-key=c4game'

let state = {
  board: Array(6)
    .fill('')
    .map(() => Array(7).fill('')),
  currentPlayer: 'r',
}

function initialize() {
  showBoard()
}

function reset() {
  state.board = Array(6)
    .fill('')
    .map(() => Array(7).fill(''))
  state.currentPlayer = 'r'
  showBoard()
}

function showBoard() {
  const boardEl = document.getElementById('board')
  boardEl.innerHTML = ''

  state.board.forEach((row, i) => {
    const rowEl = elt('div', { class: 'row' })

    row.forEach((cell, j) => {
      const fieldEl = elt('div', { class: 'field' })

      if (cell === 'r') {
        const redPiece = elt('div', { class: 'piece red' })
        fieldEl.appendChild(redPiece)
      } else if (cell === 'b') {
        const bluePiece = elt('div', { class: 'piece blue' })
        fieldEl.appendChild(bluePiece)
      }

      fieldEl.addEventListener('click', () => {
        handleFieldClick(j)
      })

      rowEl.appendChild(fieldEl)
    })

    boardEl.appendChild(rowEl)
  })
}

function handleFieldClick(column) {
  for (let row = state.board.length - 1; row >= 0; row--) {
    if (state.board[row][column] === '') {
      state.board[row][column] = state.currentPlayer
      state.currentPlayer = state.currentPlayer === 'r' ? 'b' : 'r'
      showBoard()
      return
    }
  }
}

function loadState() {
  fetch(SERVICE)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      state = data
      showBoard()
    })
}

function saveState() {
  fetch(SERVICE, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(state),
  })
}
