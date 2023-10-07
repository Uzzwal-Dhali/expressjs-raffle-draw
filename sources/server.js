const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use([morgan('dev'), cors(), express.json()])

app.use('/api/raffledraw', require('./routes'))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'success! from home'
  })
})

app.get('/health', (_req, res) => {
  res.status(200).json({
    message: 'success!'
  })
})

app.use((_req, _res, next) => {
  const error = new Error('Resource not found!')
  console.log(error)
  error.status = 404
  next(error)
})

app.use((error, _req, res, _next) => {
  console.log(error)
  if(error.status) {
    return res.status(error.status).json({
      message: error.message
    })
  }

  res.status(500).json({
    message: 'Oops! Somthing went wrong.'
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('I am from 4000 port')
})
