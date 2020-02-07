const Scene = require('telegraf/scenes/base')
const { basicReply } = require('../helper')

module.exports = new Scene('inicio')
  .enter(async (ctx) => {
    const name = ctx.update.message.from.first_name

    await basicReply(ctx, 500, 1000,
      `oh, hola ${name}! que suerte que me hablas, puedo hablar contigo?`,
      ['Si', 'No', '¿Quien eres?'])
  })
  .hears(/no/i, async (ctx) => {
    await basicReply(ctx, 500, 1500,
      'No importa, te lo contare de todas maneras.')

    await ctx.scene.enter('escape')
  })
  .hears(/si/i, async (ctx) => {
    await basicReply(ctx, 500, 1500,
      'De acuerdo, mira, te voy a contar...')
    await ctx.scene.enter('escape')
  })
  .hears(/quien eres?/i, async (ctx) => {
    await basicReply(ctx, 500, 3000,
      'Eso no importa ahorita, necesito contarte algo, ayudame por favor, di que si, di que si',
      ['Si', 'No'])
  })
