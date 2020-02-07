const Scene = require('telegraf/scenes/base')
const { basicReply } = require('../helper')

module.exports = new Scene('muerte')
  .enter(async (ctx) => {
    console.log('Cuarto inicial:', ctx.update.message.from.first_name)
    await ctx.basicReply(0, 0, 'He muerto, gracias por nada')
    await ctx.basicReply(0, 0, 'Para volver a empezar, escribe /start')
  })
