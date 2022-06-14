import express from 'express'

import { authMiddleware } from '../middleware/index.js'
import {
  getCompanies,
  getCompany,
  postCompany,
  editCompany,
  deleteCompany,
} from '../controllers/company-controller.js'

const Router = express.Router()

Router.get('/companies', authMiddleware, getCompanies)

Router.get('/company', authMiddleware, getCompany)

Router.post('/company', authMiddleware, postCompany)

Router.post('/edit-company', authMiddleware, editCompany)

Router.post('/delete-company', authMiddleware, deleteCompany)

export default Router
