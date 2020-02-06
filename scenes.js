const Scene = require('telegraf/scenes/base')
const { basicReply } = require('./helper')

function * conditionalList(list) {
  for (let [text, condition] of list) {
    if (condition) {
      yield text
    }
  }
}

module.exports = [
  new Scene('inicio')
    .enter(async (ctx) => {
      let name = ctx.update.message.from.first_name

      await basicReply(ctx, 500, 1000,
        `oh, hola ${name}! que bueno que me hablas, puedo hablar contigo?`,
        ['Si', 'No', 'Quien eres?'])
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
    }),

  new Scene('escape')
    .enter(async (ctx) => {
      await basicReply(ctx, 0, 3000,
        'Estoy en problemas y necesito tu ayuda... estaba trabajando en uno de mis inventos y accidentalmente viaje a otro universo')
      await basicReply(ctx, 0, 3000,
        'Aquí el gobierno tiene un aparato de control mental y nadie puede tomar decisiones inteligentes, por lo tanto tu me tienes que decir que hacer para poder escapar.')
      await basicReply(ctx, 0, 3000,
        'Estoy en un cuarto cerrado, veo una cama, un closet y dos puertas, una es roja y la otra es azul',
        [
          'Abre la puerta roja',
          'Abre la puerta azul',
          'Que hay dentro del closet?'
        ])
    })
    .hears('Abre la puerta azul', async (ctx) => {
      await basicReply(ctx, 500, 500,
        'Espera')
      await basicReply(ctx, 500, 2000,
        'Tiene seguro :(',
        [
          'Abre la puerta roja',
          'Que hay dentro del closet?'
        ])
    })
    .hears('Abre la puerta roja', async (ctx) => {
      await basicReply(ctx, 500, 500,
        'Espera')

      if (!ctx.session.inventory['llave-roja']) {
        await basicReply(ctx, 5000, 2000,
          'Tiene seguro :(',
          [
            'Abre la puerta azul',
            'Que hay dentro del closet?'
          ])
        return
      }
      await basicReply(ctx, 5000, 2000,
        'Pude abrir la puerta con la llave roja!')
      ctx.scene.enter('puerta_roja')
    })
    .hears('Que hay dentro del closet?', async (ctx) => {
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
      ctx.session.inventory['llave-roja'] = true
    }),

  // PUERTA ROJA
  new Scene('puerta_roja')
    .enter(async (ctx) => {
      await basicReply(ctx, 0, 3000,
        'Creo que active una alarma, me voy a esconder')
      await basicReply(ctx, 0, 2000,
        'Unos soldados armados estan viniendo, ayudame!')
    })
]
