import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import { authRoutes } from './routes/index.js'

const server = express()

server.use(bodyParser.json())

server.use('/auth', authRoutes)

server.use((err, req, res, next) => {
  const error = err

  if (error.isJoi) {
    error.statusCode = 422
  }

  if (!error.statusCode) {
    error.statusCode = 500
  }

  res.status(error.statusCode).json({
    message: error.message,
  })

  next()
})

const startServer = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sdomianidze:4GMX680AWm6LMtQS@admin-panel-api.8bito.mongodb.net/main?retryWrites=true&w=majority'
    )
    server.listen(8080)
  } catch (err) {
    console.error(err)
  }
}

startServer()
