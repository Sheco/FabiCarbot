const Scene = require('telegraf/scenes/base')
const { basicReply, conditionalList } = require('./helper')

module.exports = [
  new Scene('inicio')
    .enter(async (ctx) => {
      const name = ctx.update.message.from.first_name

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
        'Estoy adentro, hay una botella de polvo en el piso y dos pasillos largos, que hago?',
        [
          'Agarra la botella de polvo',
          'Ve al pasillo de la izquierda',
          'Ve al pasillo de adelante'
        ])
    })
    .hears('Agarra la botella de polvo', async (ctx) => {
      ctx.session.inventory.polvo = true
      await basicReply(ctx, 500, 2000,
        'Listo, meti el polvo en mis pantalones nuevo! ahora que?',
        [
          'Ve al pasillo de la izquierda',
          'Ve al pasillo de adelante'
        ])
    })
    .hears('Ve al pasillo de la izquierda', async (ctx) => {
      await basicReply(ctx, 500, 500, 'Ok')
      await basicReply(ctx, 4000, 5000,
        'Es un corredor bastante largo, hay cuadros en las paredes con dibujos de niños payasos, al final hay una puerta, junto a ella hay un letrero que dice "CUIDADO CON LA TRAMPA"',
        [...conditionalList([
          ['Abre la puerta', true],
          ['Sopla un poco de polvo hacia la puerta', ctx.session.inventory.polvo],
          ['Regresa al centro', true]
        ])])
    })
    .hears('Abre la puerta', async (ctx) => {
      await basicReply(ctx, 500, 1000, 'Eso suena facil')
      await basicReply(ctx, 500, 1000, 'Una trampa! son lasers, me estoy derritiendoooo :( adios')
      await ctx.scene.enter('muerte')
    })
    .hears('Regresa al centro', async (ctx) => {
      await basicReply(ctx, 500, 500, 'Voy')
      await basicReply(ctx, 500, 1000, 'Ya estoy de vuelta en el inicio')
      if (!ctx.session.inventory.polvo) {
        await basicReply(ctx, 500, 1000, 'Aún esta la botella de polvo en el piso')
      }
      await basicReply(ctx, 500, 1000, 'Hay dos pasillos, uno a la izquierda y uno adelante',
        [...conditionalList([
          ['Agarra la botella de polvo', !ctx.session.inventory.polvo],
          ['Ve al pasillo de la izquierda', true],
          ['Ve al pasillo de adelante', true]
        ])])
    })
    .hears('Ve al pasillo de adelante', async (ctx) => {
      await basicReply(ctx, 500, 500, 'Voy')
      await basicReply(ctx, 500, 1000, 'hmmm no hay nada aqui, creo que el desarrollador no ha hecho esta parte',
        [
          'Regresa al centro'
        ])
    }),
  new Scene('muerte')
    .enter(async (ctx) => {
      await basicReply(ctx, 0, 0, 'He muerto, gracias por nada')
    })
]
