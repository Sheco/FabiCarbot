const Scene = require('telegraf/scenes/base')

module.exports = new Scene('muerte')
  .enter(async (ctx) => {
    console.log('Cuarto inicial:', ctx.update.message.from.first_name)
    await ctx.basicReply(0, 'He muerto, gracias por nada\nPara volver a empezar, escribe /start')
  })
