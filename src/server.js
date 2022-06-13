import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import 'dotenv/config'

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
    await mongoose.connect(process.env.MONGODB_CONNECT_URL)
    server.listen(process.env.SERVER_PORT)
  } catch (err) {
    console.error(err)
  }
}

startServer()
