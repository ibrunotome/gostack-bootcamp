const express = require('express')

const server = express()

server.use(express.json())

let projects = [
  {
    id: '1',
    title: 'New project',
    tasks: ['Make coffee'],
  },
]

let reqsCount = 0

server.use((req, res, next) => {
  console.log(`Reqs until now: ${++reqsCount}`)
  return next()
})

function checkProjectExists(req, res, next) {
  const project = projects.findIndex(obj => obj.id === req.params.id)

  if (project === -1) {
    return res.status(404).json({ error: 'Project does not exists!' })
  }

  return next()
}

server.post('/projects', (req, res) => {
  const project = ({ id, title, tasks } = req.body)

  projects.push(project)

  return res.status(201).json(projects)
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Title is required!' })
  }

  const projectIndex = projects.findIndex(obj => obj.id === req.params.id)
  projects[projectIndex].tasks.push(title)

  return res.status(201).json(projects)
})

server.get('/projects', (req, res) => {
  return res.status(200).json(projects)
})

server.get('/projects/:id', checkProjectExists, (req, res) => {
  const project = projects.find(obj => obj.id === req.params.id)

  return res.status(200).json(project)
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Title is required!' })
  }

  const projectIndex = projects.findIndex(obj => obj.id === req.params.id)
  projects[projectIndex].title = title

  return res.status(200).json(projects)
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  projects = projects.filter(obj => obj.id !== req.params.id)

  return res.status(204).send()
})

server.listen(3000)
