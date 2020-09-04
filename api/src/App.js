const Koa = require('koa');
const KoaCors = require('@koa/cors');
const BodyParser = require('koa-bodyparser');
const JwtMiddleware = require('koa-jwt');
const DbConnector = require('./Mongo');
const AuthRoute = require('./routes/Auth');
const OrderRoute = require('./routes/Order');
const ChatRoute = require('./routes/Chat');

class App {
    static async create(){
        const app = new Koa()
        app.use(async function (ctx, next) {
            return next().catch((err) => {
                if (err.status === 401) {
                    ctx.status = 401
                    ctx.body = ''
                } else {
                    throw err;
                }
            });
        });
        app.use(KoaCors())
        await DbConnector()
        app.use(BodyParser())
        app.use(AuthRoute().routes())
        app.use(JwtMiddleware({
            secret: process.env.TOKEN_SECRET
        }))
        app.use(OrderRoute().routes())
        app.use(ChatRoute().routes())
        return app
    }
}
module.exports = App
