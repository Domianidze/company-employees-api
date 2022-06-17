import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import 'dotenv/config'

import { authRoutes, companyRoutes, employeeRoutes } from './routes/index.js'
import {
  corsMiddleware,
  authMiddleware,
  errorMiddleware,
  swaggerMiddleware,
} from './middleware/index.js'

import { getMongoUrl } from './util/index.js'

const server = express()

server.use(bodyParser.json())

server.use(corsMiddleware)

server.use('/api-docs', swaggerMiddleware())

server.use(authRoutes)
server.use(authMiddleware, companyRoutes)
server.use(authMiddleware, employeeRoutes)

server.use(errorMiddleware)

const startServer = async () => {
  try {
    await mongoose.connect(getMongoUrl())
    server.listen(process.env.SERVER_PORT)
  } catch (err) {
    console.error(err)
  }
}

startServer()
