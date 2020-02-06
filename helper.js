const Extra = require('telegraf/extra')

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
  return Extra.markup((markup) => markup.resize().oneTime()
    .keyboard(options))
}

exports.basicReply = async function (ctx, waitDelay, typingDelay, message, options) {
  await exports.typing(ctx, waitDelay, typingDelay)
  return ctx.reply(message, options ? exports.basicKeyboard(options) : null)
}
