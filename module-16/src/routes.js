import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
import FileController from './app/controllers/FileController'
import ProviderController from './app/controllers/ProviderController'
import AvailableController from './app/controllers/AvailableController'
import NotificationController from './app/controllers/NotificationController'

import validateUserStore from './app/validators/UserStore'
import validateUserUpdate from './app/validators/UserUpdate'
import validateAuth from './app/validators/auth'
import validateAppointmentStore from './app/validators/AppointmentStore'

import authMiddleware from './app/middlewares/auth'
import AppointmentController from './app/controllers/AppointmentController'
import ScheduleController from './app/controllers/ScheduleController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', validateUserStore, UserController.store)
routes.post('/auth', validateAuth, AuthController.login)

routes.use(authMiddleware)

routes.put('/users', validateUserUpdate, UserController.update)
routes.get('/providers', ProviderController.index)
routes.get('/providers/:providerId/available', AvailableController.index)
routes.post('/appointments', validateAppointmentStore, AppointmentController.store)
routes.get('/appointments', AppointmentController.index)
routes.delete('/appointments/:id', AppointmentController.delete)
routes.get('/schedules', ScheduleController.index)
routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)
routes.post('/files', upload.single('file'), FileController.store)

export default routes
