const Ticket = require('./Ticket')
const { readFile, writeFile } = require('./utilities')

const tickets = Symbol('tickets')

class TicketCollection {
  constructor() {
    this[tickets] = []
  }

  /**
   * create and save new ticket
   * @param {string} username
   * @param {number} price
   * @return {Ticket}
   */
  create(username, price) {
    const ticket = new Ticket(username, price)
    this[tickets].push(ticket)
    return tickets
  }

  /**
   * create bulk tickets
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * return {Ticket[]}
   */
  createBulk(username, price, quantity) {
    const result = []
    for(let i=0; i<quantity; i++) {
      const ticket = this.create(username, price)
      result.push(ticket)
    }
    return result
  }

  /**
   * update bulk
   * @param {string} username
   * @param {{username: string, price: number}} ticketBody
   * @return {Ticket[]}
   */
  updateBulk(username, ticketBody) {
    const userTickets = this.findByUsername(username)
    const updatedTickets = userTickets.map(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => this.updateByID(ticket.id, ticketBody)
    )
    return updatedTickets
  }

  /**
   * deleting bulk
   * @param {string} username
   * @return {boolean[]}
   */
  deleteBulk(username) {
    const userTickets = this.findByUsername(username)
    const deletedResult = userTickets.map(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => this.deleteTicket(ticket.id)
    )
    return deletedResult
  }

  /**
   * return all tickets
   */
  find() {
    return this[tickets]
  }

  /**
   * find a ticket by id
   * @param {string} id
   * @return {Ticket}
   */
  findByID(id) {
    const ticket = this[tickets].find(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === id
    )
    return ticket
  }

  /**
   * find a tickets of username
   * @param {string} username
   * @return {Ticket[]}
   */
  findByUsername(username) {
    const ticket = this[tickets].filter(
      /**
       * @param {Ticket} tickets
       */
      (ticket) => ticket.username === username
    )
    return tickets
  }

  /**
   * update ticket by ticket ID
   * @param {string} ticketID
   * @param {{username: string, price: number}} ticketBody
   * return {Ticket}
   */
  updateByID(ticketID, ticketBody) {
    const ticket = this.findByID(ticketID)
    ticket.username = ticketBody.username ?? ticket.username
    ticket.price = ticketBody.price ?? ticket.price
    return ticket
  }

  /**
   * delete ticket
   * @param {string} ticketID
   * return {boolean}
   */
  deleteTicket(ticketID) {
    const index = this[tickets].findIndex(
      /**
       *
       * @param {Ticket} ticket
       * @returns {object}
       */
      (ticket) => ticket.id === ticketID
    )
    if(index === -1) {
      return false
    } else {
      this[tickets].splice(index, 1)
      return true
    }
  }

  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount)
    let winnerIndex = 0
    while(winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length)
      if(!winnerIndexes.includes(ticketIndex)) {
        winnerIndexes[winnerIndex++] = ticketIndex
        continue
      }
    }
    const winners = winnerIndexes.map(
      /**
       * @param {number} index
       */
      (index) => this[tickets][index]
    )
    return winners
  }
}

const ticketsCollection = new TicketCollection()
module.exports = ticketsCollection
