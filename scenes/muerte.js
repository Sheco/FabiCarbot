const Scene = require('telegraf/scenes/base')
const { basicReply } = require('../helper')

module.exports = new Scene('muerte')
  .enter(async (ctx) => {
    await basicReply(ctx, 0, 0, 'He muerto, gracias por nada')
    await basicReply(ctx, 0, 0, 'Para volver a empezar, escribe `/start`',
      [
        '/start'
      ])
  })
