const Scene = require('telegraf/scenes/base')
const { basicReply, conditionalList } = require('../helper')

module.exports = new Scene('encrucijada')
  .enter(async (ctx) => {
    console.log('Encrucijada:', ctx.update.message.from.first_name)
    await basicReply(ctx, 0, 3000,
      'Estoy adentro, en una habitación en forma de V, estoy en el centro, en la esquina',
      [
        'Describeme lo que hay a tu alrededor'
      ])
  })
  .hears(/\balrededor\b/i, async (ctx) => {
    await basicReply(ctx, 0, 2000,
      'Es una rara habitación con forma de V')
    if (!ctx.session.inventory.botellaPolvo) {
      await basicReply(ctx, 0, 2000,
        'En el piso veo una *botella con un polvo blanco*, muy fino')
    }

    if (ctx.session.state.lasersRevelados) {
      await basicReply(ctx, 500, 3000,
        'Hay rayos laser invisibles en este pasillo, con el polvo los puedo ver')
      await basicReply(ctx, 500, 3000,
        'Creo que puedo acercarme a la *puerta* ahora')
    } else {
      await basicReply(ctx, 0, 2000,
        'En el pasillo de la izquierda hay una *puerta*, con un letrero que dice `CUIDADO`')
    }
    await basicReply(ctx, 0, 2000,
      'En el centro esta la *puerta roja* de donde vine')

    await basicReply(ctx, 0, 500,
      '¿Que hago ahora?',
      conditionalList([
        ['Agarra la botella de polvo', !ctx.session.inventory.botellaPolvo],
        ['Usa la puerta de la izquierda', true],
        ['Usa la puerta roja', true],
        ['Explora el extremo de la derecha', true]
      ]))
  })
  .hears(/\busa\b.*\bpuerta\b.*\broja\b/i, async (ctx) => {
    await basicReply(ctx, 500, 1000, 'voy')
    ctx.scene.enter('cuartoInicial')
  })
  .hears(/\bbotella\b/i, async (ctx) => {
    ctx.session.inventory.botellaPolvo = true
    await basicReply(ctx, 500, 2000,
      'Listo, ya guardé la *botella* .', [
        'Usa el polvo, soplandolo'
      ])
  })
  .hears(/\bpuerta\b.*\bizquierda\b/i, async (ctx) => {
    await basicReply(ctx, 500, 500, 'Voy')
    if (!ctx.session.state.lasersRevelados) {
      await basicReply(ctx, 3000, 2000,
        'No se que signifique el letrero que esta junto a la puerta')
      await basicReply(ctx, 500, 2000,
        'Auxilio, unos lasers!! me estoy derritiendoooooooo :dizzy_face:')
      await ctx.scene.enter('muerte')
      return
    }
    await basicReply(ctx, 500, 2000,
      'Puedo escabullirme entre los lasers...')
    await basicReply(ctx, 500, 2000,
      'La puerta tiene un candado que necesita una *combinación*',
      conditionalList([
        ['Pon 0000', ctx.session.state.combinacionEncrucijada],
        ['Explora el extremo de la derecha', true],
        ['Describeme lo que hay a tu alrededor', true]
      ]))
  })
  .hears(/\busa\b.*\bpolvo\b/i, async (ctx) => {
    await basicReply(ctx, 500, 1000, 'Buena idea! soplare para crear una nube de *polvo* :dash:')
    await basicReply(ctx, 500, 2000,
      'Esta funcionando! veo algo!',
      [
        'Describeme lo que hay a tu alrededor'
      ])
    ctx.session.state.lasersRevelados = true
  })
  .hears(/\bextremo\b.*\bderecha\b/i, async (ctx) => {
    await basicReply(ctx, 500, 500, 'Voy')
    await basicReply(ctx, 500, 1000, 'Hay una *nota de papel* tirada, parece una lista del super',
      [
        'Lee la nota',
        'Usa la puerta de la izquierda',
        'Describeme lo que hay a tu alrededor'
      ])
  })
  .hears(/\blee\b.*\bnota\b/i, async (ctx) => {
    await basicReply(ctx, 500, 500, 'Dice esto...')
    await basicReply(ctx, 500, 3000, '0 Leche\n0 Huevos\n0 Pistola NERF\n0 Dulces')
    ctx.session.state.combinacionEncrucijada = true
  })
  .hears(/\b0000\b/i, async (ctx) => {
    if (!ctx.session.state.combinacionEncrucijada) {
      return
    }
    await basicReply(ctx, 500, 2000,
      'Funcionó la *combinación*, gracias! he logrado salir!')
    ctx.scene.enter('muerte')
  })
