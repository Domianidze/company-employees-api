import express from 'express'

import { authMiddleware } from '../middleware/index.js'
import {
  getEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from '../controllers/employee-controller.js'

const Router = express.Router()

Router.get('/get-employees', authMiddleware, getEmployees)

Router.post('/get-employee', authMiddleware, getEmployee)

Router.post('/add-employee', authMiddleware, addEmployee)

Router.put('/edit-employee', authMiddleware, editEmployee)

Router.delete('/delete-employee', authMiddleware, deleteEmployee)

export default Router
