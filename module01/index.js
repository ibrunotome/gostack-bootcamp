const express = require('express')

const server = express()

server.use(express.json())

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Bruno Tomé" }

const users = ['Diego', 'Robson', 'Maria']

server.use((req, res, next) => {
  console.log(`Method: ${req.method}; URL: ${req.url}`)
  return next()
})

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required!' })
  }

  return next()
}

function checkuserInArray(req, res, next) {
  const user = users[req.params.index]
  if (!user) {
    return res.status(400).json({ error: 'User does not exists!' })
  }

  req.user = user

  return next()
}

server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', checkuserInArray, (req, res) => {
  return res.json(req.user)
})

server.post('/users', checkUserExists, checkuserInArray, (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

server.put('/users/:index', checkUserExists, checkuserInArray, (req, res) => {
  const { index } = req.params
  const { name } = req.body

  users[index] = name

  return res.json(users)
})

server.delete('/users/:index', (req, res) => {
  const { index } = req.params

  users.splice(index, 1)

  return res.status(204).send()
})

server.listen(3000)
