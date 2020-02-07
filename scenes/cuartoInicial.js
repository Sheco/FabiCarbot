const Scene = require('telegraf/scenes/base')

module.exports = new Scene('cuartoInicial')
  .enter(async (ctx) => {
    console.log('Cuarto inicial:', ctx.update.message.from.first_name)
    await ctx.basicReply(0, 5000,
      'Estoy en un cuarto pequeño con dos *puertas*: una *roja* y la otra *azul*',
      [
        'Usa la puerta roja',
        'Usa la puerta azul',
        'Describe lo que ves a tu alrededor'
      ])
  })
  .hears(/\bdescribe\b.*\balrededor\b/i, async (ctx) => {
    await ctx.basicReply(500, 2000,
      'Estoy en un cuarto pequeño, las ventanas estan cerradas con madera')

    await ctx.basicReply(500, 2000,
      'Hay una cama con sabanas blancas, bastante sucias y descuidadas')
    await ctx.basicReply(500, 2000,
      'En una de las paredes hay un *closet* de madera cubierto de telarañas')
    await ctx.basicReply(500, 2000,
      'Al lado del closet hay una *puerta roja*')
    await ctx.basicReply(500, 2000,
      'Y del otro lado del closet hay una *puerta azul*', [
        'Usa la puerta roja',
        'Usa la puerta azul',
        'Examina el closet'
      ])
  })
  .hears(/\busa\b.*\bpuerta\b.*\bazul\b/i, async (ctx) => {
    await ctx.basicReply(500, 500,
      'Espera')
    await ctx.basicReply(500, 2000,
      'Tiene seguro :neutral_face:')
  })
  .hears(/\busa\b.*\bpuerta\b.*\broja\b/i, async (ctx) => {
    await ctx.basicReply(500, 500,
      'Espera')

    if (!ctx.session.inventory.llave_roja) {
      await ctx.basicReply(5000, 2000,
        'Tiene seguro :neutral_face:')
      return
    }
    await ctx.basicReply(5000, 2000,
      'Pude abrir la puerta con la *llave roja*!')
    ctx.scene.enter('encrucijada')
  })
  .hears(/\bexamina\b.*\bcloset\b/i, async (ctx) => {
    await ctx.basicReply(500, 500,
      'Dejame ver')

    await ctx.basicReply(5000, 2000,
      'Tiene mucha *ropa* y unos *cajones*, no se que hacer!!',
      [
        'Examina los cajones',
        'Examina la ropa',
        'Describe lo que ves a tu alrededor'
      ])
  })
  .hears(/\bexamina\b.*\bcajones\b/i, async (ctx) => {
    await ctx.basicReply(500, 500,
      'Un momento...')
    await ctx.basicReply(0, 2000,
      'Hay una libreta en blanco, pero no parece importante.')
  })
  .hears(/\bexamina\b.*\bropa\b/i, async (ctx) => {
    if (ctx.session.inventory.llave_roja) {
      await ctx.basicReply(500, 500,
        'Pero si la revisé bien! :confused:')
      await ctx.basicReply(2000, 2000,
        'Espera, encontre una nota en otro pantalón')
      // TODO: enviar la nota como foto
      await ctx.basicReply(500, 2000,
        'La nota dice: El que lea esto es un huevo podrido')
      return
    }
    await ctx.basicReply(500, 500,
      'Entendido! dame un minuto')
    await ctx.basicReply(15000, 3000,
      'Uno de estos pantalones me queda muy bien, que me lo voy a quedar, seguiré buscando en la ropa...')
    await ctx.basicReply(10000, 3000,
      'Encontré una *llave roja* en la bolsa de una bata!',
      [
        'Usa la puerta roja',
        'Usa la puerta azul',
        'Examina la ropa otra vez',
        'Describe lo que ves a tu alrededor'
      ])
    ctx.session.inventory.llave_roja = true
  })
