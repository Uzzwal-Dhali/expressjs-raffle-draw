const nanoID = require('nanoid')

class Ticket {
  /**
   * will receive usernam and price
   * @param {string} username
   * @param {number} price
   */
  constructor(username, price) {
    this.id = nanoID.random
    this.username = username
    this.price = price
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

module.exports = Ticket
