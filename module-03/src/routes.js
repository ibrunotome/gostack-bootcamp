import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)
routes.post('/users', UserController.store)
routes.post('/auth', AuthController.login)

routes.use(authMiddleware)

routes.put('/users', UserController.update)

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true })
})

export default routes
