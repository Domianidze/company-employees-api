import mongoose from 'mongoose'

const { Schema } = mongoose

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  idNumber: {
    type: Number,
    required: true,
  },
  companyId: {
    type: String,
    ref: 'Company',
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startedWorkingDate: {
    type: String,
    required: true,
  },
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
