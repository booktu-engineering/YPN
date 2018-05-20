import mongoose from 'mongoose'
const db = process.env.NODE_ENV === 'test' ? 'ypn-test' : 'ypn'

mongoose.connect(`mongodb://localhost/${db}`)
