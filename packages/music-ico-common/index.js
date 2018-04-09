const mongoose  = require('mongoose')

const mongoDB = `${process.env.MONGO_URL}/${process.env.MONGO_DB}`

const connectWithDB = () => {
  mongoose.Promise = global.Promise
  return mongoose.connect(mongoDB)
}

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log("Mongoose default connection is disconnected due to application termination")
    process.exit(0)
  })
})

module.exports = connectWithDB