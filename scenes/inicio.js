const Scene = require('telegraf/scenes/base')
const { basicReply } = require('../helper')

module.exports = new Scene('inicio')
  .enter(async (ctx) => {
    const name = ctx.update.message.from.first_name
    console.log('Inicio:', ctx.update.message.from.first_name)

    await basicReply(ctx, 500, 1000,
      `Hola ${name}! que suerte que me hablas!!!`)

    await basicReply(ctx, 500, 1000,
      '¿Podemos hablar?',
      ['Si', 'No', '¿Quien eres?'])
  })
  .hears(/no/i, async (ctx) => {
    await basicReply(ctx, 500, 1500,
      'No importa, te lo tengo que decir de todas maneras')

    await ctx.scene.enter('cuartoInicial')
  })
  .hears(/(si|ok|esta bien)/i, async (ctx) => {
    await basicReply(ctx, 500, 1500,
      'Excelente! no sabes que alegría me da leer eso!')
    await basicReply(ctx, 0, 5000,
      'Estoy en problemas y necesito tu ayuda... estaba trabajando en uno de mis inventos y accidentalmente viaje a otro universo :sweat:')
    await basicReply(ctx, 0, 5000,
      'Aquí el gobierno tiene un aparato de control mental y no puede pensar claramente, tienes que decirme que hacer para poder escapar.')
    await ctx.scene.enter('cuartoInicial')
  })
  .hears(/quien eres?/i, async (ctx) => {
    await basicReply(ctx, 500, 2000,
      'Soy Fabi Carbot, soy aficionada de la ciencia')
    await basicReply(ctx, 500, 2000,
      'Normalmente llevo una vida muy tranquila pero ahorita estoy en problemas :cry:')
    await basicReply(ctx, 500, 2000,
      'Ayudame')
  })
