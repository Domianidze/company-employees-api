import express from 'express'

import {
  getCompanies,
  getCompany,
  postCompany,
  editCompany,
  deleteCompany,
} from '../controllers/company-controller.js'

const Router = express.Router()

Router.get('/companies', getCompanies)

Router.get('/company', getCompany)

Router.post('/company', postCompany)

Router.post('/edit-company', editCompany)

Router.post('/delete-company', deleteCompany)

export default Router
