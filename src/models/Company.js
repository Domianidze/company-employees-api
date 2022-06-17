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
      employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
      },
      _id: false,
    },
  ],
})

const Company = mongoose.model('Company', companySchema)

export default Company
