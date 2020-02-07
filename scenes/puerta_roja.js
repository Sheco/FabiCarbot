const Scene = require('telegraf/scenes/base')
const { basicReply, conditionalList } = require('../helper')

module.exports = new Scene('puerta_roja')
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
      'Listo, meti el polvo en mis pantalones nuevos, ahora que?',
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
  })
