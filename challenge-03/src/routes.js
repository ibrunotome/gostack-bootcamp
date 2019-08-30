import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
import FileController from './app/controllers/FileController'
import MeetupController from './app/controllers/MeetupController'
import OrganizingController from './app/controllers/OrganizingController'
import SubscriptionController from './app/controllers/SubscriptionController'
import authMiddleware from './app/middlewares/auth'

import validateUserStore from './app/validators/UserStore'
import validateUserUpdate from './app/validators/UserUpdate'
import validateMeetupStore from './app/validators/MeetupStore'
import validateMeetupUpdate from './app/validators/MeetupUpdate'
import validateLogin from './app/validators/LoginValidation'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', validateUserStore, UserController.store)
routes.post('/login', validateLogin, AuthController.login)

routes.use(authMiddleware)

routes.put('/users', validateUserUpdate, UserController.update)
routes.post('/files', upload.single('file'), FileController.store)

routes.get('/meetups/organizing', OrganizingController.index)
routes.get('/meetups', MeetupController.index)
routes.post('/meetups', validateMeetupStore, MeetupController.store)
routes.get('/meetups/:id', MeetupController.show)
routes.put('/meetups/:id', validateMeetupUpdate, MeetupController.update)
routes.delete('/meetups/:id', MeetupController.delete)

routes.get('/subscriptions', SubscriptionController.index)
routes.post('/meetups/:meetupId/subscribe', SubscriptionController.store)
routes.delete('/meetups/:meetupId/unsubscribe', SubscriptionController.delete)

export default routes
