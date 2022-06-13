import express from 'express'

import {
  getCompanies,
  getCompany,
  postCompany,
} from '../controllers/company-controller.js'

const Router = express.Router()

Router.get('/companies', getCompanies)

Router.get('/company', getCompany)

Router.post('/company', postCompany)

export default Router
