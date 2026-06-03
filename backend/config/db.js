console.log('db.js loaded')
const mongoose = require('mongoose')

async function connectDB() {

  console.log('Inside connectDB')

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    )

    console.log(
      'MongoDB Connected'
    )

  } catch (error) {

    console.error(
      error
    )

    process.exit(1)

  }

}
console.log('Exporting connectDB')

module.exports = connectDB