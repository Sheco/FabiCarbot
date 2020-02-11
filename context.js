const Context = require('telegraf/context')
const Markup = require('telegraf/markup')
const emoji = require('node-emoji')
const { sleep, conditionalList } = require('./helper')

/*
 * Contexto personalizado para agregar metodos de conveniencia
 * para algunas tareas comúnes
 */
class CustomContext extends Context {
  async typing (typingDelay) {
    await this.replyWithChatAction('typing')
    return sleep(typingDelay)
  }

  basicKeyboard (options) {
    return Markup
      .keyboard(conditionalList(options))
      .resize()
      .extra()
  }

  async basicReply (typingDelay, message, options) {
    await this.typing(typingDelay)
    return this.replyWithMarkdown(emoji.emojify(message), options ? this.basicKeyboard(options) : null)
  }
}

module.exports = CustomContext
