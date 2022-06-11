import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const server = express()

server.use(bodyParser.json())

server.use((req, res) => {
  res.json({
    message: 'Working!',
  })
})

const startServer = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sdomianidze:4GMX680AWm6LMtQS@admin-panel-api.8bito.mongodb.net/admin-panel-api?retryWrites=true&w=majority'
    )
    server.listen(8080)
  } catch (err) {
    console.error(err)
  }
}

startServer()
