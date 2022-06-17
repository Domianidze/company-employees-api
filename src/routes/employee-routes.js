import express from 'express'

import {
  getEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from '../controllers/index.js'

const Router = express.Router()

Router.get('/get-employees', getEmployees)

Router.post('/get-employee', getEmployee)

Router.post('/add-employee', addEmployee)

Router.put('/edit-employee', editEmployee)

Router.delete('/delete-employee', deleteEmployee)

export default Router
