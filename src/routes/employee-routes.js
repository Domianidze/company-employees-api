import express from 'express'

import { authMiddleware } from '../middleware/index.js'
import {
  getEmployees,
  getEmployee,
  postEmployee,
  editEmployee,
  deleteEmployee,
} from '../controllers/employee-controller.js'

const Router = express.Router()

Router.get('/employees', authMiddleware, getEmployees)

Router.get('/employee', authMiddleware, getEmployee)

Router.post('/employee', authMiddleware, postEmployee)

Router.post('/edit-employee', authMiddleware, editEmployee)

Router.post('/delete-employee', authMiddleware, deleteEmployee)

export default Router
