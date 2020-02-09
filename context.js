const Context = require('telegraf/context')
const Extra = require('telegraf/extra')
const emoji = require('node-emoji')
const { sleep, conditionalList } = require('./helper')

class CustomContext extends Context {
  is (state) {
    return this.session.state && this.session.state[state]
  }

  has (item) {
    return this.session.inventory && this.session.inventory[item]
  }

  give (item) {
    if (!this.session.inventory) {
      this.session.inventory = {}
    }
    this.session.inventory[item] = true
  }

  takeAway (item) {
    delete this.session.inventory[item]
  }

  setState (state) {
    if (!this.session.state) {
      this.session.state = {}
    }
    this.session.state[state] = true
  }

  removeState (state) {
    delete this.session.state[state]
  }

  async typing (typingDelay) {
    await this.replyWithChatAction('typing')
    return sleep(typingDelay)
  }

  basicKeyboard (options) {
    return Extra.markup((markup) => markup.resize()
      .keyboard(conditionalList(options)))
  }

  async basicReply (typingDelay, message, options) {
    await this.typing(typingDelay)
    return this.replyWithMarkdown(emoji.emojify(message), options ? this.basicKeyboard(options) : null)
  }
}

module.exports = CustomContext
