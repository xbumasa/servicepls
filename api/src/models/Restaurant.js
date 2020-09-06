const Mongoose = require('mongoose');

const RestaurantSchema = Mongoose.Schema({
    RestaurantID:{
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        required: true
    },
    IsOpen: {
        type: Boolean,
        default: false
    },
    Tables: {
        type: [{
            TableID:{
                type: Number,
                required: true,
                unique: true
            },
            TableNumber: {
                type: Number,
                required: true
            },
            IsAvailable: {
                type: Boolean,
                default: false
            },
            _id: false
        }],
        default: []
    }
})

module.exports = Mongoose.model('Restaurants', RestaurantSchema, 'Restaurants')
