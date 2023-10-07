const { response } = require('express')
const Ticket = require('./Ticket')
const { readFile, writeFile } = require('./utilities')

const tickets = Symbol('tickets')

class TicketCollection {
  constructor() {
    (async function(){
      this[tickets] = await readFile()
    }.bind(this)())
  }

  /**
   * return all tickets
   */
  tickets() {
    return this[tickets]
    writeFile(this[tickets])
  }

  /**
   * create and save new ticket
   * @param {string} username
   * @param {number} price
   * @return {Ticket}
   */
  createTicket(username, price) {
    const ticket = new Ticket(username, price)
    this[tickets].push(ticket)
    writeFile(this[tickets])
    return tickets
  }

  /**
   * find a ticket by id
   * @param {string} id
   * @return {Ticket}
   */
  readTicket(id) {
    const ticket = this[tickets].find(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === id
    )
    return ticket
  }

  /**
   * update ticket by ticket ID
   * @param {string} ticketID
   * @param {{username: string, price: number}} ticketBody
   * return {Ticket}
   */
  updateTicket(ticketID, ticketBody) {
    const ticket = this.findByID(ticketID)
    if(ticket) {
      ticket.username = ticketBody.username ?? ticket.username
      ticket.price = ticketBody.price ?? ticket.price
    }
    writeFile(this[tickets])
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
      writeFile(this[tickets])
      return true
    }
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
    writeFile(this[tickets])
    return result
  }

  /**
   * find a tickets of username
   * @param {string} username
   * @return {Ticket[]}
   */
  readdBulk(username) {
    const ticket = this[tickets].filter(
      /**
       * @param {Ticket} tickets
       */
      (ticket) => ticket.username === username
    )
    return tickets
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
    writeFile(this[tickets])
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
    writeFile(this[tickets])
    return deletedResult
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

const ticketCollection = new TicketCollection()
module.exports = ticketCollection
