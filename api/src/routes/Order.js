const KoaRouter = require('koa-router');
const Cryptor = require('cryptr');
const ServiceSessionsModel = require('../models/ServiceSessions');

module.exports = function(){
    let router = new KoaRouter();

    router.post('/order', async (ctx, next) => {
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

        const ValidateSession = await ServiceSessionsModel.update({
            _id:jwt_payload.SessionID,
            Status: true,
            Customers: {$elemMatch: {CustomerID: jwt_payload.CustomerID}}
        },{
            $push:{"Customers.$.Orders":{
                    OrderTypeID: ctx.request.body.OrderTypeID
                }}
        }).exec()

        ctx.status = 200
    })

    return router
}
