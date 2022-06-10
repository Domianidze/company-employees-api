import express from 'express'

const server = express()

server.use((req, res) => {
  res.json({
    message: 'Working!',
  })
})

server.listen(8080)
