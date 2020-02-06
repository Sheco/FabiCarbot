const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(session())

const stage = new Stage()
const scenes = require('./scenes')
stage.register(...scenes)

bot.use(stage.middleware())
bot.command('/start', (ctx) => {
  ctx.session.inventory = {}
  ctx.session.state = {}
  ctx.scene.enter('inicio')
})

bot.launch()
