const Scene = require('telegraf/scenes/base')
const { basicReply } = require('../helper')

module.exports = new Scene('escape')
  .enter(async (ctx) => {
    await basicReply(ctx, 0, 5000,
      'Estoy en problemas y necesito tu ayuda... estaba trabajando en uno de mis inventos y accidentalmente viaje a otro universo')
    await basicReply(ctx, 0, 5000,
      'Aquí el gobierno tiene un aparato de control mental y nadie puede tomar decisiones inteligentes, por lo tanto tu me tienes que decir que hacer para poder escapar.')
    await basicReply(ctx, 0, 5000,
      'Estoy en un cuarto cerrado, veo una cama, un closet y dos puertas, una es roja y la otra es azul',
      [
        'Abre la puerta roja',
        'Abre la puerta azul',
        '¿Que hay dentro del closet?'
      ])
  })
  .hears('Abre la puerta azul', async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Espera')
    await basicReply(ctx, 500, 2000,
      'Tiene seguro :(',
      [
        'Abre la puerta roja',
        '¿Que hay dentro del closet?'
      ])
  })
  .hears('Abre la puerta roja', async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Espera')

    if (!ctx.session.inventory.llave_roja) {
      await basicReply(ctx, 5000, 2000,
        'Tiene seguro :(',
        [
          'Abre la puerta azul',
          '¿Que hay dentro del closet?'
        ])
      return
    }
    await basicReply(ctx, 5000, 2000,
      'Pude abrir la puerta con la llave roja!')
    ctx.scene.enter('puerta_roja')
  })
  .hears('¿Que hay dentro del closet?', async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Dejame ver')

    await basicReply(ctx, 5000, 2000,
      'Tiene mucha ropa y unos cajones, no se que hacer!!',
      [
        'Busca en los cajones',
        'Saca toda la ropa'
      ])
  })
  .hears('Busca en los cajones', async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Un momento...')
    await basicReply(ctx, 0, 2000,
      'Hay una libreta en blanco',
      [
        'Saca toda la ropa'
      ])
  })
  .hears('Saca toda la ropa', async (ctx) => {
    await basicReply(ctx, 500, 500,
      'Entendido! dame un minuto')
    await basicReply(ctx, 15000, 3000,
      'Uno de estos pantalones me quedo muy bien, creo que me lo voy a quedar, seguiré bajando la ropa...')
    await basicReply(ctx, 10000, 3000,
      'Encontré una llave roja!',
      [
        'Abre la puerta roja',
        'Abre la puerta azul'
      ])
    ctx.session.inventory.llave_roja = true
  })