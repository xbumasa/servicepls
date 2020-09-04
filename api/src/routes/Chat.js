const KoaRouter = require('koa-router');
const Cryptor = require('cryptr');
const { decode: Base64SafeDecode } = require('../utils/Base64Safe');

module.exports = function(){
    let router = new KoaRouter();

    router.post('/chat', async (ctx, next) => {
        const crypt = new Cryptor(process.env.TOKEN_SECRET)

        let jwt_payload;

        try {
            jwt_payload = await Base64SafeDecode(crypt.decrypt(ctx.state.user.data))
        } catch (e) {
            ctx.status = 401
            return
        }
    })

    return router
}
