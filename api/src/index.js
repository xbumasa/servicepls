const App = require('./App.js');

;(async () => {
    const app = App.create()
    const server = (await app).listen(process.env.API_PORT || 3030)
})()

// Error handling
process.on('uncaughtException', err => {
    Log.error(err.message || err.toString());
    console.log(err.stack);
    process.exit(1);
});
