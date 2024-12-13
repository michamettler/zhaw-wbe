function connect4Winner(element, board) {
  for (const [x, row] of board.entries()) {
    for (const [y, field] of row.entries()) {
      if (field !== element) {
        continue
      }
      let horizontally = check(element, board, x, y, 1, 0)
      let horizontallyBackwards = check(element, board, x, y, -1, 0)
      let vertically = check(element, board, x, y, 0, -1)
      let verticallyBackwards = check(element, board, x, y, 0, 1)
      let diagonalRising = check(element, board, x, y, -1, 1)
      let diagonalRisingBackwards = check(element, board, x, y, 1, 1)
      let diagonalFalling = check(element, board, x, y, -1, -1)
      let diagonalFallingBackwards = check(element, board, x, y, 1, -1)

      if (
        horizontally ||
        horizontallyBackwards ||
        vertically ||
        verticallyBackwards ||
        diagonalRising ||
        diagonalRisingBackwards ||
        diagonalFallingBackwards ||
        diagonalFalling
      )
        return true
    }
  }
  return false
}

function check(element, board, x, y, xDir, yDir) {
  if (!isRangeValid(board, x, y, xDir, yDir)) return false

  for (let delta = 0; delta < 4; delta++) {
    let xNew = x + xDir * delta
    let yNew = y + yDir * delta

    const field = board[xNew][yNew]
    if (field !== element) {
      return false
    }
  }
  return true
}

function isRangeValid(board, x, y, xDir, yDir) {
  const xMax = board.length
  const xEnd = x + 3 * xDir
  if (xEnd < 0 || xEnd >= xMax) return false

  const yMax = board[0].length
  const yEnd = y + 3 * yDir
  if (yEnd < 0 || yEnd >= yMax) return false

  return true
}