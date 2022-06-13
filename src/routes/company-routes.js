import express from 'express'

import { getCompanies, postCompany } from '../controllers/company-controller.js'

const Router = express.Router()

Router.get('/companies', getCompanies)

Router.post('/company', postCompany)

export default Router
