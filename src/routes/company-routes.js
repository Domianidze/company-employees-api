import express from 'express'

import {
  getCompanies,
  getCompany,
  addCompany,
  editCompany,
  deleteCompany,
} from '../controllers/index.js'

const Router = express.Router()

Router.get('/get-companies', getCompanies)

Router.post('/get-company', getCompany)

Router.post('/add-company', addCompany)

Router.put('/edit-company', editCompany)

Router.delete('/delete-company', deleteCompany)

export default Router
