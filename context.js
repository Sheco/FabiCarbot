const Context = require('telegraf/context')
const Extra = require('telegraf/extra')
const emoji = require('node-emoji')
const { sleep } = require('./helper')

class CustomContext extends Context {
  async typing (typingDelay) {
    await this.replyWithChatAction('typing')
    return sleep(typingDelay)
  }

  basicKeyboard (options) {
    return Extra.markup((markup) => markup.resize()
      .keyboard(options))
  }

  async basicReply (typingDelay, message, options) {
    await this.typing(typingDelay)
    return this.replyWithMarkdown(emoji.emojify(message), options ? this.basicKeyboard(options) : null)
  }
}

module.exports = CustomContext
