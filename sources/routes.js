const router = require('express').Router()
const {
  tickects,
  createTicket,
  readTicket,
  updateTicket,
  deleteTicket,
  createBulk,
  readBulk,
  updateBulk,
  deleteBulk,
  raffleDraw
} = require('./controllers')

router.route('/ticket/:id')
  .get(readTicket)
  .put(updateTicket)
  .delete(deleteTicket)

router.route('/bulk/:username')
  .get(readBulk)
  .put(updateBulk)
  .delete(deleteBulk)

router.post('/createBulk', createBulk)
router.route('/')
  .get(tickects)
  .post(createTicket)

router.get('/raffleDraw', raffleDraw)

module.exports = router;
