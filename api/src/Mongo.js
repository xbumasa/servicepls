const { connect } = require('mongoose')

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB
} = process.env;

module.exports = function ConnectDb(){
    return connect(
        `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            connectTimeoutMS: 10000
        }
    )
}



