require('dotenv').config()
const Express = require('express');
const app = Express();
const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');

dbConnection.authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server] is running on ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log(`[Server] crashed ${err}`)
  })

app.use(Express.json());
app.use(middleware.CORS)
app.use('/pin', controllers.pinController)
app.use('/patch', controllers.patchController)
app.use('/user', controllers.userController)