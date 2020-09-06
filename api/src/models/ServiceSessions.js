const Mongoose = require('mongoose')
const ServiceSessionsSchema = Mongoose.Schema({
    RestaurantID:{
        type: Number,
        required: true
    },
    TableID:{
        type: Number,
        required: true
    },
    CreatedAt:{
        type: Date,
        required: true
    },
    Status:{
        type: Boolean,
        default: true
    },
    Customers:{
        type: [{
            CustomerID:{
                type: String,
                required: true
            },
            Orders:{
                type: [{
                    OrderTypeID: {
                        type: Number,
                        required: true
                    },
                    Amount:{
                        type: Number,
                        default: 1
                    },
                    OrderedAt:{
                        type: Date,
                        required: true
                    },
                    Done:{
                        type: Boolean,
                        default: false
                    }
                }],
                default:[]
            }
        }],
        default: []
    }
})

module.exports = Mongoose.model('ServiceSessions', ServiceSessionsSchema, 'ServiceSessions')
