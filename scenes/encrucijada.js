const Scene = require('telegraf/scenes/base')
const { basicReply, conditionalList } = require('../helper')

module.exports = new Scene('encrucijada')
  .enter(async (ctx) => {
    await basicReply(ctx, 0, 3000,
      'Estoy adentro, en una habitación en forma de V, estoy en el centro, en la esquina',
      [
        'Describeme lo que hay a tu alrededor'
      ])
  })
  .hears(/alrededor/i, async (ctx) => {
    await basicReply(ctx, 0, 2000,
      'Es una rara habitación con forma de V')
    if (!ctx.session.inventory.botellaPolvo) {
      await basicReply(ctx, 0, 2000,
        'En el piso veo una botella con un polvo blanco, muy fino')
    }

    if (ctx.session.state.lasersRevelados) {
      await basicReply(ctx, 500, 3000,
        'Hay rayos laser invisibles en este pasillo, con el polvo los puedo ver')
      await basicReply(ctx, 500, 3000,
        'Creo que puedo acercarme a la puerta ahora')
    } else {
      await basicReply(ctx, 0, 2000,
        'En el pasillo de la izquierda hay una puerta, con un letrero')
      await basicReply(ctx, 0, 2000,
        'El letrero dice "CUIDADO"')
    }
    await basicReply(ctx, 0, 500,
      '¿Que hago ahora?',
      conditionalList([
        ['Agarra la botella de polvo', !ctx.session.inventory.botellaPolvo],
        ['Acercate a la puerta de la izquierda', true],
        ['Explora el extremo de la derecha', true]
      ]))
  })
  .hears(/botella/i, async (ctx) => {
    ctx.session.inventory.botellaPolvo = true
    await basicReply(ctx, 500, 2000,
      'Listo, he metido la botella en mis pantalones nuevos.', [
        'Usa el polvo, soplandolo'
      ])
  })
  .hears(/puerta.*izquierda/i, async (ctx) => {
    await basicReply(ctx, 500, 500, 'Voy')
    if (!ctx.session.state.lasersRevelados) {
      await basicReply(ctx, 3000, 2000,
        'No se que signifique el letrero que esta junto a la puerta')
      await basicReply(ctx, 500, 2000,
        'Auxilio, me estoy derritiendoooooooo')
      await ctx.scene.enter('muerte')
      return
    }
    await basicReply(ctx, 500, 2000,
      'Puedo escabullirme entre los lasers')
    await basicReply(ctx, 500, 2000,
      'La puerta tiene un candado que necesita una combinación',
      conditionalList([
        ['Pon 0000', ctx.session.state.combinacionEncrucijada],
        ['Explora el extremo de la derecha', true],
        ['Describeme lo que hay a tu alrededor', true]
      ]))
  })
  .hears(/usa.*polvo/i, async (ctx) => {
    await basicReply(ctx, 500, 1000, 'Buena idea! soplare para crear una nube de polvo')
    await basicReply(ctx, 500, 2000,
      'Esta funcionando! veo algo!',
      [
        'Describeme lo que hay a tu alrededor'
      ])
    ctx.session.state.lasersRevelados = true
  })
  .hears(/extremo.*derecha/i, async (ctx) => {
    await basicReply(ctx, 500, 500, 'Voy')
    await basicReply(ctx, 500, 1000, 'Hay una hoja de papel tirada, parece una lista del super',
      [
        'Lee la nota',
        'Acercate a la puerta de la izquierda',
        'Describeme lo que hay a tu alrededor'
      ])
  })
  .hears(/lee.*nota/i, async (ctx) => {
    await basicReply(ctx, 500, 500, 'Dice esto...')
    await basicReply(ctx, 500, 3000, '0 Leche\n0 Huevos\n0 Pistola NERF\n0 Dulces')
    ctx.session.state.combinacionEncrucijada = true
  })
  .hears(/0000/i, async (ctx) => {
    if (!ctx.session.state.combinacionEncrucijada) {
      return
    }
    await basicReply(ctx, 500, 2000,
      'Si funciona la contraseña, gracias! he logrado salir!')
    ctx.scene.enter('muerte')
  })
