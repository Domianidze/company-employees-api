import express from 'express'

import {
  getEmployees,
  getEmployee,
  postEmployee,
  editEmployee,
  deleteEmployee,
} from '../controllers/employee-controller.js'

const Router = express.Router()

Router.get('/employees', getEmployees)

Router.get('/employee', getEmployee)

Router.post('/employee', postEmployee)

Router.post('/edit-employee', editEmployee)

Router.post('/delete-employee', deleteEmployee)

export default Router
