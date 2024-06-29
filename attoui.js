function f(type, ...children) {
  const el = type !== null ? document.createElement(type) : document.createDocumentFragment()

  if (children &&
    children.length > 0 &&
    children[0] instanceof Object &&
    children[0] !== null &&
    !(children[0] instanceof Node)) {
    const props = children.shift()
    for (const prop in props) {
      el[prop] = props[prop]
    }
  }

  for (const child of children || []) {
    if (child instanceof Node) {
      el.appendChild(child)
    } else if (child === false || child === undefined || child === null) {
      continue
    } else {
      el.appendChild(
        document.createTextNode(child)
      )
    }
  }

  return el
}

function mount(root, state, reduce, render) {
  function rerender() {
    const update = render(state, dispatch)
    while (root.firstChild) {
      root.removeChild(root.firstChild)
    }
    root.appendChild(update)
  }

  function dispatch(action) {
    state = reduce(state, action)
    rerender()
  }

  rerender()
}
