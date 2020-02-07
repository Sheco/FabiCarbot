const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(session())

const stage = new Stage()
stage.register(...[
  require('./scenes/inicio'),
  require('./scenes/muerte'),
  require('./scenes/puerta_roja'),
  require('./scenes/escape')
])

bot.use(stage.middleware())
bot.command('start', (ctx) => {
  ctx.session.inventory = {}
  ctx.session.state = {}
  ctx.scene.enter('inicio')
})
bot.command('enter', (ctx) => {
  const args = ctx.update.message.text.split(' ')
  if (args.length === 1) {
    return
  }
  console.log('entrando a escena ', args[1])
  try {
    ctx.scene.enter(args[1])
  } catch {
  }
})

bot.launch()
