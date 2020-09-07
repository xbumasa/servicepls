const KoaRouter = require('koa-router');
const Cryptor = require('cryptr');
const ServiceSessionsModel = require('../models/ServiceSessions');

module.exports = function(){
    let router = new KoaRouter();

    router.post('/order', async (ctx, next) => {
        if(!ctx.request.body.OrderTypeID){
            ctx.status = 401
            return
        }

        let OrderTypeID = ctx.request.body.OrderTypeID;
        let OrderAmount = ctx.request.body.OrderAmount;

        if(!(/^\d+$/.test(OrderTypeID))){
            ctx.status = 401
            return
        }

        const crypt = new Cryptor(process.env.CRYPT_TOKEN)

        let jwt_payload;

        try{
            jwt_payload = crypt.decrypt(ctx.state.user.data)
            jwt_payload = JSON.parse(jwt_payload)
        }
        catch(e){
            ctx.status = 401
            return
        }

        const ValidateSession = await ServiceSessionsModel.findOne({
            _id:jwt_payload.SessionID,
            Status: true
        }).select({_id:1}).exec()

        if(!ValidateSession){
            ctx.status = 401
            return
        }

        let OrderTimeframe = new Date()
        OrderTimeframe.setTime(OrderTimeframe.getTime()-(3*60*1000))

        const ValidateSessionOrder = await ServiceSessionsModel.find({
            _id: jwt_payload.SessionID,
            Status: true,
            Customers: {
                $elemMatch: {
                    CustomerID: jwt_payload.CustomerID,
                    Orders:{
                        $elemMatch:{
                            OrderTypeID: OrderTypeID,
                            Done: false,
                            OrderedAt: {$gte: OrderTimeframe}
                        }
                    }
                }
            }
        },{"Customers.$": 1}).
        exec()

        if(ValidateSessionOrder.length){
            ctx.status = 200
            ctx.body = 'WAIT'
            return
        }

        const InsertOrder = await ServiceSessionsModel.update({
            _id:jwt_payload.SessionID,
            Status: true,
            Customers: {$elemMatch: {CustomerID: jwt_payload.CustomerID}}
        },{
            $push:{"Customers.$.Orders":{
                    OrderTypeID: OrderTypeID,
                    OrderedAt: Date.now(),
                    Amount: OrderAmount
                }}
        }).exec()

        if(!InsertOrder.n){
            ctx.status = 401
            return
        }

        ctx.status = 200
    })

    return router
}
