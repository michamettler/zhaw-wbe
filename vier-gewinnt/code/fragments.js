
import { render, useSJDON } from "./lib/suiweb-1.1.js"

let state = {
  board: [
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ]
  ],
  next: 'r'
}

let stateSeq = []


//  Components
//
const App = () => [Board, {board: state.board}] 

const Board = ({board}) => {
  let flatBoard = [].concat(...board)
  let fields = flatBoard.map((type) => [Field, {type}])
  return (
    ["div", {className: "board"}, ...fields]
  )
}

const Field = ({type}) => {
  // ...
}

useSJDON(Field, Board, App)


//  Show board:
//  render [App]
//
function showBoard () {
  const app = document.querySelector(".app")
  app.innerHTML = ""
  render([App], app)
  return app
}


  
// document.querySelector("button.undo").addEventListener("click", () => {
//   if (stateSeq.length > 0) {
//     state = stateSeq.pop()
//     showBoard()
//   }
// })

