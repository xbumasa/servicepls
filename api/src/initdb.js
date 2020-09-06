const DbConnector = require('./Mongo');
const RestaurantModel = require('./models/Restaurant');
const ServiceSessions = require('./models/ServiceSessions');

DbConnector()

RestaurantModel.create({
    RestaurantID: 100,
    Name: 'FalafelTaim',
    IsOpen: true,
    CreatedAt: Date.now(),
    Tables:[{
        TableID: 1,
        TableNumber: 1,
        IsAvailable: true
    }, {
        TableID: 2,
        TableNumber: 2,
        IsAvailable: true
    }]
})
    .then(( )=>{
        console.log('RestaurantModel Created!')
    })
    .catch(e=>{
        console.log(e.message)
    })


ServiceSessions.create({
    RestaurantID: 100,
    TableID: 1,
    CreatedAt: Date.now(),
    Customers: []
},{
    RestaurantID: 100,
    TableID: 2,
    CreatedAt: Date.now(),
    Customers: []
})
    .then(( )=>{
        console.log('ServiceSessions Created!')
    })
    .catch(e=>{
        console.log(e.message)
    })
