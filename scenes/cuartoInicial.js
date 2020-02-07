const Scene = require('telegraf/scenes/base')
const { basicReply } = require('../helper')

module.exports = new Scene('cuartoInicial')
  .enter(async (ctx) => {
    console.log('Cuarto inicial:', ctx.update.message.from.first_name)
    await basicReply(ctx, 0, 5000,
      'Estoy en un cuarto pequeño con dos *puertas*: una *roja* y la otra *azul*',
      [
        'Usa la puerta roja',
        'Usa la puerta azul',
        'Describeme lo que ves a tu alrededor'
      ])
  })
  .hears(/describe.*alrededor/i, async (ctx) => {
    await basicReply(ctx, 500, 2000,
      'Estoy en un cuarto pequeño, las ventanas estan cerradas con madera')

    await basicReply(ctx, 500, 2000,
      'Hay una cama con sabanas blancas, bastante sucias y descuidadas')
    await basicReply(ctx, 500, 2000,
      'En una de las paredes hay un *closet* de madera cubierto de telarañas')
    await basicReply(ctx, 500, 2000,
      'Al lado del closet hay una *puerta roja*')
    await basicReply(ctx, 500, 2000,
      'Y del otro lado del closet hay una *puerta azul*', [
        'Usa la puerta roja',
        'Usa la puerta azul',
        'Examina el closet'
      ])
  })
  .hears(/usa.*puerta.*azul/i, async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Espera')
    await basicReply(ctx, 500, 2000,
      'Tiene seguro :neutral_face:')
  })
  .hears(/usa.*puerta.*roja/i, async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Espera')

    if (!ctx.session.inventory.llave_roja) {
      await basicReply(ctx, 5000, 2000,
        'Tiene seguro :neutral_face:')
      return
    }
    await basicReply(ctx, 5000, 2000,
      'Pude abrir la puerta con la *llave roja*!')
    ctx.scene.enter('encrucijada')
  })
  .hears(/examina.*closet/i, async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Dejame ver')

    await basicReply(ctx, 5000, 2000,
      'Tiene mucha *ropa* y unos *cajones*, no se que hacer!!',
      [
        'Examina los cajones',
        'Examina la ropa',
        'Describeme lo que ves a tu alrededor'
      ])
  })
  .hears(/examina.*cajones/i, async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Un momento...')
    await basicReply(ctx, 0, 2000,
      'Hay una libreta en blanco, pero no parece importante.')
  })
  .hears(/examina.*ropa/i, async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Entendido! dame un minuto')
    await basicReply(ctx, 15000, 3000,
      'Uno de estos pantalones me queda muy bien, que me lo voy a quedar, seguiré buscando en la ropa...')
    await basicReply(ctx, 10000, 3000,
      'Encontré una *llave roja* en la bolsa de una bata!',
      [
        'Usa la puerta roja',
        'Usa la puerta azul',
        'Describeme lo que ves a tu alrededor'
      ])
    ctx.session.inventory.llave_roja = true
  })
