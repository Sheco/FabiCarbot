const Scene = require('telegraf/scenes/base')

module.exports = new Scene('inicio')
  .enter(async (ctx) => {
    const name = ctx.update.message.from.first_name
    console.log('Inicio:', ctx.update.message.from.first_name)

    await ctx.basicReply(500, 1000,
      `Hola ${name}! que suerte que me hablas!!!`)

    await ctx.basicReply(500, 1000,
      '¿Podemos hablar?',
      ['Si', 'No', '¿Quien eres?'])
  })
  .hears(/\bno\b/i, async (ctx) => {
    await ctx.basicReply(500, 1500,
      'No importa, te lo tengo que decir de todas maneras')

    await ctx.scene.enter('cuartoInicial')
  })
  .hears(/\b(si|ok|esta bien)\b/i, async (ctx) => {
    await ctx.basicReply(500, 1500,
      'Excelente! no sabes que alegría me da leer eso!')
    await ctx.basicReply(0, 5000,
      'Estoy en problemas y necesito tu ayuda... estaba trabajando en uno de mis inventos y accidentalmente viaje a otro universo :sweat:')
    await ctx.basicReply(0, 5000,
      'Aquí el gobierno tiene un aparato de control mental y no puedo pensar claramente, tienes que decirme que hacer para poder escapar.')
    await ctx.scene.enter('cuartoInicial')
  })
  .hears(/\bquien eres?\b/i, async (ctx) => {
    await ctx.basicReply(500, 2000,
      'Soy Fabi Carbot, soy aficionada de la ciencia')
    await ctx.basicReply(500, 2000,
      'Normalmente llevo una vida muy tranquila pero ahorita estoy en problemas :cry:')
    await ctx.basicReply(500, 2000,
      'Ayudame')
  })
