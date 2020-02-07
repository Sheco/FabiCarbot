const Scene = require('telegraf/scenes/base')
const { basicReply } = require('../helper')

module.exports = new Scene('muerte')
  .enter(async (ctx) => {
    console.log('Cuarto inicial:', ctx.update.message.from.first_name)
    await basicReply(ctx, 0, 0, 'He muerto, gracias por nada')
    await basicReply(ctx, 0, 0, 'Para volver a empezar, escribe /start')
  })
