const Mongoose = require('mongoose')
const CustomerSchema = Mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    restaurant: {
        type: Number,
        required: true
    },
    table: {
        type: Number,
        required: true
    },
    visit: {
        type: Date,
        default: new Date().getTime()
    }
})

module.exports = Mongoose.model('Customer', CustomerSchema)
