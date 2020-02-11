module.exports = class Player {
  constructor (ctx) {
    this.ctx = ctx
  }

  is (state) {
    return this.ctx.session.state && this.ctx.session.state[state]
  }

  has (item) {
    return this.ctx.session.inventory && this.ctx.session.inventory[item]
  }

  give (item) {
    if (!this.ctx.session.inventory) {
      this.ctx.session.inventory = {}
    }
    this.ctx.session.inventory[item] = true
  }

  takeAway (item) {
    delete this.ctx.session.inventory[item]
  }

  setState (state) {
    if (!this.ctx.session.state) {
      this.ctx.session.state = {}
    }
    this.ctx.session.state[state] = true
  }

  removeState (state) {
    delete this.ctx.session.state[state]
  }
}
