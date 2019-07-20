import { Router } from 'express'
import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/login', AuthController.login)

routes.use(authMiddleware)

routes.put('/users', UserController.update)

export default routes
