import express from 'express'

import {
  getEmployees,
  postEmployee,
} from '../controllers/employee-controller.js'

const Router = express.Router()

Router.get('/employees', getEmployees)

Router.post('/employee', postEmployee)

export default Router
