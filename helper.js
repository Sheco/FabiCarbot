const Extra = require('telegraf/extra')
const emoji = require('node-emoji')

exports.sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
exports.typing = async function (ctx, waitDelay, typingDelay) {
  await exports.sleep(waitDelay)
  await ctx.replyWithChatAction('typing')
  return exports.sleep(typingDelay)
}

exports.basicKeyboard = function (options) {
  return Extra.markup((markup) => markup.resize()
    .keyboard(options))
}

exports.basicReply = async function (ctx, waitDelay, typingDelay, message, options) {
  await exports.typing(ctx, waitDelay, typingDelay)
  return ctx.replyWithMarkdown(emoji.emojify(message), options ? exports.basicKeyboard(options) : null)
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
