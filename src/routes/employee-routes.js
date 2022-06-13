import express from 'express'

import { postEmployee } from '../controllers/employee-controller.js'

const Router = express.Router()

Router.post('/employee', postEmployee)

export default Router
