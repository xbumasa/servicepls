const Mongoose = require('mongoose')

const RestaurantOrderTypesSchema = Mongoose.Schema({
    RestaurantID:{
        type: Mongoose.Schema.ObjectId,

    },
    Name:{
        type: String,
        required: true
    },
    DisplayText: {
        type: String,
        required: true
    },
    IconMDI: {
        type: String,
        required: true
    },
    SubOrderTypes:{
        type: [{
            Name:{
                type: String,
                required: true
            },
            DisplayText: {
                type: String,
                required: true
            },
            Price: {
                type: Mongoose.Schema.Decimal,
                default: 0.0
            },
            Amount: {
                type: Number,
                default: 0
            }
        }],
        default: []
    }
})
