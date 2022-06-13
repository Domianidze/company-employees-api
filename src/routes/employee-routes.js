import express from 'express'

import {
  getEmployees,
  postEmployee,
  editEmployee,
} from '../controllers/employee-controller.js'

const Router = express.Router()

Router.get('/employees', getEmployees)

Router.post('/employee', postEmployee)

Router.post('/edit-employee', editEmployee)

export default Router
