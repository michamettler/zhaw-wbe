function renderSJDON(element, appRoot) {
  let tree
  if (Array.isArray(element)) {
    tree = document.createElement(element[0])
    let attrs = Object.assign(
      {},
      ...element.filter((a) => typeof a === 'object' && !Array.isArray(a))
    )
    for (const a in attrs) {
      tree.setAttribute(a, attrs[a])
    }
    let children = element
      .slice(1)
      .filter((a) => typeof a === 'string' || Array.isArray(a))
    for (const child of children) {
      renderSJDON(child, tree)
    }
  } else if (typeof element === 'string') {
    tree = document.createTextNode(element)
  }

  appRoot.appendChild(tree)
}

const element = [
  'div',
  { style: 'background: salmon' },
  ['h1', 'Hello World'],
  ['h2', { style: 'text-align:right' }, 'from our library'],
]

let appRoot = document.getElementById('app')
renderSJDON(element, appRoot)
