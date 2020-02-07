
exports.sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

exports.conditionalList = function (list) {
  const arr = []
  for (const [text, condition] of list) {
    if (condition) {
      arr.push(text)
    }
  }
  return arr
}
