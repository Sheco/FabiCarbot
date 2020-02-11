const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const Context = require('./context')
const Player = require('./player')
const { basicReply } = require('./helper')
require('dotenv').config()

function scene (name) {
  return require('./scenes/' + name)
}

const bot = new Telegraf(process.env.BOT_TOKEN,
  { contextType: Context })

/*
 * Extender el contexto, una vez que la sesión haya sido cargada, entonces
 * agregar una propiedad, player, que recibe la sesión como almacenamiento
 *
 * Lo hice de esta manera porque el middleware de sesión regresa una promesa
 * que se resuelve en el siguiente tick, por lo que no puedo crear un
 * middleware normal, porque la sesión no estara inicializada en ese momento
 */
const sessionMiddleware = Telegraf.session()
bot.use((ctx, next) => {
  return sessionMiddleware(ctx, (ctx) => {
    ctx.player = new Player(ctx.session)
    return next()
  })
})

/* Cargar las escenas en memoria */
const stage = new Stage()
stage.register(
  scene('inicio'),
  scene('muerte'),
  scene('cuartoInicial'),
  scene('encrucijada')
)

const stageMiddleware = stage.middleware()

/*
 * Middleware especial, si el bot esta ocupado respondiendo
 * a este mismo usuario, ignorara cualquier otro mensaje que
 * llegue, esto con la finalidad de evitar flood y responder
 * varias veces cuando ya esta tratando de hacer algo el bot
 */
bot.use((ctx, next) => {
  if (ctx.player.is('busy')) {
    console.log('ignorando mensaje', ctx.update.message.text)
    return next()
  }
  return stageMiddleware(ctx, next)
})

/*
 * Inicializar el juego!
 */
bot.command('start', (ctx) => {
  ctx.player.reset()
  ctx.scene.enter('inicio')
})

/*
 * Este es un comando de prueba, solo para depuración
 * y pruebas, te lleva directo a cualquiera de las escenas
 */
bot.command('enter', (ctx) => {
  const args = ctx.update.message.text.split(' ')
  if (args.length === 1) {
    return
  }
  const name = args[1]

  if (!ctx.scene.scenes.has(name)) {
    return
  }

  ctx.scene.enter(name)
})

/*
 * En cualquier parte el bot puede oir la palabra
 * inventario y respondera si tiene alguno de los
 * objetos del juego
 */
bot.hears('inventario', async (ctx) => {
  if (ctx.player.has('llave_roja')) {
    await basicReply(ctx, 0, 0, 'Tengo una llave roja')
  }
  if (ctx.player.has('botellaPolvo')) {
    await basicReply(ctx, 0, 0, 'Tengo una botella de polvo')
  }
})

/* Inicialización del bot */
if (process.env.WEBHOOK_URL) {
  bot.launch({
    webhook: {
      domain: process.env.WEBHOOK_URL,
      port: process.env.PORT
    }
  })
} else {
  bot.launch()
}
