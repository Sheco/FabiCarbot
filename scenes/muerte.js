const Scene = require('telegraf/scenes/base')

module.exports = new Scene('muerte')
  .enter(async (ctx) => {
    console.log('Cuarto inicial:', ctx.update.message.from.first_name)
    await ctx.basicReply(500, 'He muerto, gracias por nada')
    await ctx.basicReply(500, 'Para volver a empezar, escribe /start')
  })
