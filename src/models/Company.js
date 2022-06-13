import mongoose from 'mongoose'

const { Schema } = mongoose

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  foundedDate: {
    type: String,
    required: true,
  },
  employees: [
    {
      employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
      },
    },
  ],
})

const Company = mongoose.model('Company', companySchema)

export default Company
