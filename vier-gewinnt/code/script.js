let state = {
  board: Array(6)
    .fill('')
    .map(() => Array(7).fill('')),
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

      rowEl.appendChild(fieldEl)
    })

    boardEl.appendChild(rowEl)
  })
}

function randomUpdate() {
  const row = Math.floor(Math.random() * 6)
  const col = Math.floor(Math.random() * 7)
  const actions = ['', 'r', 'b']
  const randomAction = actions[Math.floor(Math.random() * actions.length)]

  state.board[row][col] = randomAction

  showBoard()
}

setInterval(randomUpdate, 1000)
