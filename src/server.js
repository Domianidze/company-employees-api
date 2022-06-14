import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import 'dotenv/config'

import { authRoutes, companyRoutes, employeeRoutes } from './routes/index.js'
import { errorMiddleware } from './middleware/index.js'

const server = express()

server.use(bodyParser.json())

server.use(authRoutes)
server.use(companyRoutes)
server.use(employeeRoutes)

server.use(errorMiddleware)

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URL)
    server.listen(process.env.SERVER_PORT)
  } catch (err) {
    console.error(err)
  }
}

startServer()
