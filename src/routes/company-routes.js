import express from 'express'

import { authMiddleware } from '../middleware/index.js'
import {
  getCompanies,
  getCompany,
  addCompany,
  editCompany,
  deleteCompany,
} from '../controllers/company-controller.js'

const Router = express.Router()

Router.get('/get-companies', authMiddleware, getCompanies)

Router.post('/get-company', authMiddleware, getCompany)

Router.post('/add-company', authMiddleware, addCompany)

Router.put('/edit-company', authMiddleware, editCompany)

Router.delete('/delete-company', authMiddleware, deleteCompany)

export default Router
