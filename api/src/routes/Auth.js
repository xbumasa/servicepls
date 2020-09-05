const KoaRouter = require('koa-router');
const { verify: VerifyWebToken, sign: SignToken, TokenExpiredError } = require('jsonwebtoken');
const Cryptor = require('cryptr');
const { v4: uuidv4 } = require('uuid');
const { encode: Base64SafeEncode, decode: Base64SafeDecode, validate: isBase64Safe } = require('../utils/Base64Safe');
const ServiceSessionsModel = require('../models/ServiceSessions');

const {
    TOKEN_SECRET,
    CRYPT_TOKEN
} = process.env;

module.exports = function (){
    let router = new KoaRouter();

    router.post('/auth', async (ctx, next) => {
        /***/
        /*try{
            let c = new Cryptor(CRYPT_TOKEN)
            let a = Base64SafeEncode(c.encrypt(JSON.stringify({RestaurantID:100,TableID:1})))
            ctx.body = a
            return
        }
        catch(e){
            ctx.body = e.message
            return
        }*/
        /***/


        let jwt_token = ctx.request.headers['authorization'];

        if(!ctx.request.body.o && !jwt_token){
            ctx.status = 401
            return
        }

        const crypt = new Cryptor(CRYPT_TOKEN)

        let auth_data;

        if(ctx.request.body.o){
            if(!isBase64Safe(ctx.request.body.o)){
                ctx.status = 401
                return
            }

            try{
                auth_data = await crypt.decrypt(Base64SafeDecode(ctx.request.body.o))
                auth_data = JSON.parse(auth_data)
            }
            catch (e){
                ctx.status = 401
                return
            }
        }

        if(!auth_data){
            ctx.status = 401
            return
        }

        let jwt_payload;

        if(jwt_token){
            let jwt_parts = jwt_token.toString().split(" ")
            if(jwt_parts.length === 2 && /^Bearer$/i.test(jwt_parts[0])){
                try{
                    jwt_payload = await VerifyWebToken(jwt_parts[1], TOKEN_SECRET)
                    jwt_payload = await crypt.decrypt(jwt_payload.data)
                    jwt_payload = JSON.parse(jwt_payload)

                    if(
                        auth_data.TableID !== jwt_payload.TableID ||
                        auth_data.RestaurantID !== jwt_payload.RestaurantID
                    ){
                        ctx.status = 401
                        return
                    }

                    const ValidateSessionCustomer = await ServiceSessionsModel.findOne({
                        TableID: jwt_payload.TableID,
                        RestaurantID: jwt_payload.RestaurantID,
                        Status: true,
                        "Customers.CustomerID": jwt_payload.CustomerID
                    }).exec()

                    if(!ValidateSessionCustomer){
                        ctx.status = 401
                        return
                    }
                }
                catch(e){
                    if(!(e instanceof TokenExpiredError)){
                        ctx.status = 401;
                        return
                    }
                }
            }
        }

        if(!jwt_payload){
            const ValidateSession = await ServiceSessionsModel.findOne({
                TableID: auth_data.TableID,
                RestaurantID: auth_data.RestaurantID,
                Status: true
            }).select({_id:1}).exec()

            if(!ValidateSession){
                ctx.status = 401;
                return
            }

            const CustomerID = uuidv4();

            jwt_token = SignToken({
                data: crypt.encrypt(JSON.stringify({
                    CustomerID: CustomerID,
                    RestaurantID: auth_data.RestaurantID,
                    TableID: auth_data.TableID,
                    SessionID: ValidateSession._id
                }))
            }, TOKEN_SECRET, {
                expiresIn: "1h"
            })

            await ServiceSessionsModel.update({_id:ValidateSession._id}, {$push:{Customers:{CustomerID:CustomerID}}}).exec()
        }

        ctx.body = {
            token: jwt_token
        }
        ctx.status = 200
    })

    return router
}
