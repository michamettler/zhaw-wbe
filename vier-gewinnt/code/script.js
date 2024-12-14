//const SERVICE = 'http://localhost:3000/api/data/c4state?api-key=c4game'

let state = {
  board: Array(6)
    .fill('')
    .map(() => Array(7).fill('')),
  currentPlayer: 'r',
}

const stateSeq = []

function initialize() {
  render()
}

function undo() {
  if (stateSeq.length > 0) {
    const lastMove = stateSeq.pop()
    state.board[lastMove[0]][lastMove[1]] = ''
    state.currentPlayer = state.currentPlayer === 'r' ? 'b' : 'r'
    render()
  }
}

function reset() {
  state.board = Array(6)
    .fill('')
    .map(() => Array(7).fill(''))
  state.currentPlayer = 'r'
  stateSeq.length = 0
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
      stateSeq.push([row, column])
      render()
      if (connect4Winner(prev, state.board)) {
        showWinnerModal(prev)
      }
      return
    }
  }
}

function showWinnerModal(player) {
  const modal = document.getElementById("winnerModal");
  const message = document.getElementById("winnerMessage");

  message.textContent = `Congratulations player ${player === 'r' ? 'Red' : 'Blue'}, you won! :)`;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("winnerModal");
  modal.style.display = "none";
  reset();
}

const setInObj = (obj, attr, val) => {
  let temp = {}
  temp[attr] = val
  return { ...obj, ...temp }
}

const setInList = (lst, idx, val) => [
  ...lst.slice(0, idx),
  val,
  ...lst.slice(idx + 1),
]

function loadState() {
  state = JSON.parse(localStorage.getItem('state'))
  render()
}

function saveState() {
  localStorage.setItem('state', JSON.stringify(state))
}
