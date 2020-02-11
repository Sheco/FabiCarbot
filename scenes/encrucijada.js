const Scene = require('telegraf/scenes/base')
const { sleep } = require('../helper')

module.exports = new Scene('encrucijada')
  .enter(async (ctx) => {
    console.log('Encrucijada:', ctx.update.message.from.first_name)
    await ctx.basicReply(3000,
      'Estoy en una habitación en forma de V, estoy en el centro, en la esquina',
      [
        'Describe lo que hay a tu alrededor'
      ])
  })
  .hears(/\bdescribe\b.*\balrededor\b/i, async (ctx) => {
    ctx.player.setState('busy')

    await ctx.basicReply(2000,
      'Es una rara habitación con forma de V')
    if (!ctx.player.has('botellaPolvo')) {
      await ctx.basicReply(2000,
        'En el piso veo una *botella con un polvo blanco*, muy fino')
    }

    if (ctx.player.is('lasersRevelados')) {
      await sleep(500)
      await ctx.basicReply(3000,
        'Hay rayos laser invisibles en este pasillo, con el polvo los puedo ver')

      await sleep(500)
      await ctx.basicReply(3000,
        'Creo que puedo acercarme a la *puerta* ahora')
    } else {
      await ctx.basicReply(2000,
        'En el pasillo de la izquierda hay una *puerta*, con un letrero que dice `CUIDADO`')
    }
    await ctx.basicReply(2000,
      'En el centro esta la *puerta roja* de donde vine')

    await ctx.basicReply(500,
      '¿Que hago ahora?',
      [
        'Usa la puerta de la izquierda',
        'Usa la puerta roja',
        ['Agarra la botella de polvo', !ctx.player.has('botellaPolvo')],
        'Explora el extremo de la derecha'
      ])

    ctx.player.removeState('busy')
  })
  .hears(/\busa\b.*\bpuerta\b.*\broja\b/i, async (ctx) => {
    ctx.player.setState('busy')

    await sleep(500)
    await ctx.basicReply(1000, 'voy')

    ctx.player.removeState('busy')
    ctx.scene.enter('cuartoInicial')
  })
  .hears(/\bbotella\b/i, async (ctx) => {
    ctx.player.setState('busy')
    ctx.player.give('botellaPolvo')

    await sleep(500)
    await ctx.basicReply(2000,
      'La botella dice que sirve para hacer nubes artificiales')
    await ctx.basicReply(2000,
      'Modo de empleo: sople el polvo con gracia y delicadeza',
      [
        'Usa el polvo!'
      ])

    ctx.player.removeState('busy')
  })
  .hears(/\bpuerta\b.*\bizquierda\b/i, async (ctx) => {
    ctx.player.setState('busy')

    await sleep(500)
    await ctx.basicReply(500, 'Voy')
    if (!ctx.player.is('lasersRevelados')) {
      if (!ctx.player.is('lasersConocidos')) {
        await sleep(3000)
        await ctx.basicReply(2000,
          'No se que signifique el letrero que esta junto a la *puerta*')
      }
      await sleep(500)
      await ctx.basicReply(2000,
        'Juepuchisss!! algo me dio toque no puedo seguir por aquí :dizzy_face:')

      await sleep(500)
      await ctx.basicReply(2000,
        'No me pidas que lo vuelva a hacer porfa :confounded:')

      ctx.player.setState('lasersConocidos')
      ctx.player.removeState('busy')
      return
    }
    await sleep(500)
    await ctx.basicReply(2000,
      'Puedo escabullirme entre los lasers...')

    await sleep(500)
    await ctx.basicReply(2000,
      'La puerta tiene un candado que necesita una *combinación*',
      [
        ['Pon 0000', ctx.player.is('combinacionEncrucijada')],
        'Explora el extremo de la derecha',
        'Describe lo que hay a tu alrededor'
      ])

    ctx.player.removeState('busy')
  })
  .hears(/\busa\b.*\bpolvo\b/i, async (ctx) => {
    ctx.player.setState('busy')

    await sleep(500)
    await ctx.basicReply(1000, 'Buena idea! soplare para crear una nube de *polvo* :dash:')

    await sleep(500)
    await ctx.basicReply(2000,
      'Esta funcionando! veo algo!',
      [
        'Describe lo que hay a tu alrededor'
      ])
    ctx.player.setState('lasersRevelados')

    ctx.player.removeState('busy')
  })
  .hears(/\bextremo\b.*\bderecha\b/i, async (ctx) => {
    ctx.player.setState('busy')

    await sleep(500)
    await ctx.basicReply(500, 'Voy')

    await sleep(500)
    await ctx.basicReply(1000, 'Hay una *nota de papel* tirada, parece una lista del super',
      [
        'Lee la nota',
        'Usa la puerta de la izquierda',
        'Describe lo que hay a tu alrededor'
      ])

    ctx.player.removeState('busy')
  })
  .hears(/\blee\b.*\bnota\b/i, async (ctx) => {
    ctx.player.setState('busy')

    await sleep(500)
    await ctx.basicReply(500, 'Dice esto...')

    await sleep(500)
    await ctx.basicReply(3000, '0 Leche\n0 Huevos\n0 Pistola NERF\n0 Dulces')

    ctx.player.setState('combinacionEncrucijada')

    ctx.player.removeState('busy')
  })
  .hears(/\b0000\b/i, async (ctx) => {
    if (!ctx.player.is('combinacionEncrucijada')) {
      return
    }
    ctx.player.setState('busy')

    await sleep(500)
    await ctx.basicReply(2000,
      'Funcionó la *combinación*, gracias! he logrado salir!')

    ctx.player.removeState('busy')
    ctx.scene.enter('muerte')
  })
