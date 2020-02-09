
exports.sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

exports.conditionalList = function (list) {
  const arr = []
  for (const content of list) {
    if (typeof (content) === 'string') {
      arr.push(content)
      continue
    }

    const [text, condition] = content

    if (condition) {
      arr.push(text)
    }
  }
  return arr
}
