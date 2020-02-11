module.exports = class Player {
  constructor (session) {
    this.session = session
    this.session.state = session.state || {}
    this.session.inventory = session.inventory || {}
  }

  reset () {
    this.session.state = {}
    this.session.inventory = {}
  }

  is (state) {
    return this.session.state && this.session.state[state]
  }

  has (item) {
    return this.session.inventory && this.session.inventory[item]
  }

  give (item) {
    if (!this.session.inventory) {
      this.session.inventory = {}
    }
    this.session.inventory[item] = true
  }

  takeAway (item) {
    delete this.session.inventory[item]
  }

  setState (state) {
    if (!this.session.state) {
      this.session.state = {}
    }
    this.session.state[state] = true
  }

  removeState (state) {
    delete this.session.state[state]
  }
}
