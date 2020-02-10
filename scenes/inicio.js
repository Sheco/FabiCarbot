const Scene = require('telegraf/scenes/base')
const { sleep } = require('../helper')

module.exports = new Scene('inicio')
  .enter(async (ctx) => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`Hola ${name}`)
    console.log('Inicio:', ctx.update.message.from.first_name)
    await sleep(500)
    await ctx.basicReply(1000,
      'Que suerte que me hablas!!!')

    await sleep(500)
    await ctx.basicReply(1000,
      '¿Podemos hablar?',
      ['Si', 'No', '¿Quien eres?'])
  })
  .hears(/\bno\b/i, async (ctx) => {
    ctx.setState('busy')

    await sleep(500)
    await ctx.basicReply(1500,
      'No importa, te lo tengo que decir de todas maneras')

    await ctx.scene.enter('cuartoInicial')

    ctx.removeState('busy')
  })
  .hears(/\b(si|ok|esta bien)\b/i, async (ctx) => {
    ctx.setState('busy')

    await sleep(500)
    await ctx.basicReply(1500,
      'Excelente! no sabes que alegría me da leer eso!')
    await ctx.basicReply(5000,
      'Estoy en problemas y necesito tu ayuda... estaba trabajando en uno de mis inventos y accidentalmente viaje a otro universo :sweat:')
    await ctx.basicReply(5000,
      'Aquí el gobierno tiene un aparato de control mental y no puedo pensar claramente, tienes que decirme que hacer para poder escapar.')
    await ctx.scene.enter('cuartoInicial')

    ctx.removeState('busy')
  })
  .hears(/\bquien eres?\b/i, async (ctx) => {
    ctx.setState('busy')

    await sleep(500)
    await ctx.basicReply(2000,
      'Soy Fabi Carbot, aficionada de las ciencias')

    await sleep(500)
    await ctx.basicReply(2000,
      'Normalmente llevo una vida muy tranquila pero ahorita estoy en problemas :cry:')

    await sleep(500)
    await ctx.basicReply(2000,
      'Ayudame, por favor, si?')

    ctx.removeState('busy')
  })
