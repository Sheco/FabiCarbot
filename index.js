const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Context = require('./context')
const { basicReply } = require('./helper')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN,
  {
    contextType: Context
  })
bot.use(session())

const stage = new Stage()
function scene (name) {
  return require('./scenes/' + name)
}
stage.register(
  scene('inicio'),
  scene('muerte'),
  scene('cuartoInicial'),
  scene('encrucijada')
)

bot.use(stage.middleware())

bot.command('start', (ctx) => {
  ctx.session.inventory = {}
  ctx.session.state = {}
  ctx.scene.enter('inicio')
})

bot.command('enter', (ctx) => {
  const args = ctx.update.message.text.split(' ')
  ctx.session.inventory = {}
  ctx.session.state = {}
  if (args.length === 1) {
    return
  }
  const name = args[1]

  if (!ctx.scene.scenes.has(name)) {
    return
  }

  ctx.scene.enter(name)
})
bot.hears('inventario', async (ctx) => {
  if (!ctx.session.inventory) {
    return
  }

  if (ctx.session.inventory.llave_roja) {
    await basicReply(ctx, 0, 0, 'Tengo una llave roja')
  }
  if (ctx.session.inventory.polvo) {
    await basicReply(ctx, 0, 0, 'Tengo una botella de polvo')
  }
})

bot.launch()
