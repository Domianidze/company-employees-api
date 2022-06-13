import express from 'express'

import { postCompany } from '../controllers/company-controller.js'

const Router = express.Router()

Router.post('/company', postCompany)

export default Router
