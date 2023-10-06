const ticketCollection = require('./tickets')

// TICKET CREATE OPERATION
exports.createTicket = (req, res, next) => {
  const { username, price } = req.body
  const ticket = ticketCollection.createTicket(username, price)
  res.status(201).json({
    message: 'Ticket created successfully!',
    ticket,
  })
}

// TICKET READ OPERATION
exports.readTicket = (req, res) => {
  const id = req.param.id
  const ticket = ticketCollection.readTicket(id)
  if(!ticket) {
    return res.status(404).json({
      message: '404 - Not found!'
    })
  }
  res.status(200).json(ticket)
}

// TICKET UPDATE OPERATION
exports.updateTicket = (req, res) => {
  const id = req.param.id
  const ticket = ticketCollection.updateTicket(id, req.body)
  if(!ticket) {
    return res.status(404).json({
      message: '404 - Not found!'
    })
  }
  res.status(200).json(ticket)
}

// DELETE TICKET
exports.deleteTicket = (req, res) => {
  const id = req.param.id
  const isDeleted = ticketCollection.deleteTicket(id)
  if(isDeleted) {
    return res.status(204).send()
  }
  res.status(400).json({
    message: 'Ticket is not deleted!'
  })
}

// BULK CRUD
// CREATE BULK
exports.createBulk = (req, res, next) => {
  const { username, price, quality } = req.body
  const tickets = ticketCollection.createBulk(username, price, quantity)
  res.status(201).json({
    message: 'Bulk of tickects created successfully!',
    tickets
  })
}

// READ BULK
exports.readBulk = (req, res) => {
  const username = req.param.username
  const tickects = ticketCollection.readBulk(username)
  res.status(200).json({
    items: tickects,
    total: tickects.length
  })
}

// UPDATE BULK
exports.updateBulk = (req, res) => {
  const username = req.param.username
  const tickects = ticketCollection.updateBulk(username, req.body)
  res.status(200).json({
    items: tickects,
    total: tickects.length
  })
}

// DELETE BULK
exports.deleteBulk = (req, res) => {
  const username = req.param.username
  ticketCollection.deleteBulk(username)
  res.status(204).send()
}

// ALL TICKETS
exports.tickects = (req, res) => {
  const tickects = ticketCollection.tickects()
  res.status(200).json({
    items: tickets,
    total: tickects.length
  })
}

// RAFFLE DRAW
exports.raffleDraw = (req, res) => {
  const numOfWinners = req.query.numOfWinners ?? 3
  const winners = ticketCollection.draw(numOfWinners)
  res.status(200).json(winners)
}
