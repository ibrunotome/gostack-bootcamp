const express = require('express')

const server = express()

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Bruno Tomé" }

server.get('/users/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  return res.json({ message: `Searching for ${id}` })
})

server.listen(3000)
