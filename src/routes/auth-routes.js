import express from 'express'

import { register } from '../controllers/auth-controller.js'

const Router = express.Router()

Router.post('/register', register)

export default Router
