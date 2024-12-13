//const SERVICE = 'http://localhost:3000/api/data/c4state?api-key=c4game'

let state = {
  board: Array(6)
    .fill('')
    .map(() => Array(7).fill('')),
  currentPlayer: 'r',
}

function initialize() {
  render()
}

function reset() {
  state.board = Array(6)
    .fill('')
    .map(() => Array(7).fill(''))
  state.currentPlayer = 'r'
  render()
}

function render() {
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
  const prev = state.currentPlayer
  for (let row = state.board.length - 1; row >= 0; row--) {
    if (state.board[row][column] === '') {
      state.board[row][column] = state.currentPlayer
      state.currentPlayer = state.currentPlayer === 'r' ? 'b' : 'r'
      render()
      if (connect4Winner(prev, state.board)) {
        alert(`Congratulations player ${prev}, you won! :)`)
      }
      return
    }
  }
}

function loadState() {
  state = JSON.parse(localStorage.getItem('state'))
  render()
}

function saveState() {
  localStorage.setItem('state', JSON.stringify(state))
}
