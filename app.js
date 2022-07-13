require("dotenv").config()
const cors = require('cors')
const express = require("express")
const app = express()
const Sequelize = require('sequelize')
const sequelize = require('./util/database')
// const router = require('./routes/routes')
const authRoutes = require('./routes/auth')
// const register = require('./routes/register')
// const login = require('./routes/login')
const db = require("./models/roles")
const Role = db.role;

app.use(express.json());

(async () => {
    await db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Resync Db')
        initial()
        const port = process.env.PORT || 3000
        app.listen(port,()=> console.log(`Server Started on port ${port}...`))

    }).catch(err => {
        console.log(err)
    })
})()

function initial() {
    Role.create({
      id: 1,
      name: "user"
    })
   
    Role.create({
      id: 2,
      name: "admin"
    })
  }

// db.sequelize.authenticate().then(() => {
//     console.log('Connection established successfully.')
// }).catch(err => {
//     console.error('Unable to connect to the database:', err)
// })

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  next()
})
app.use('/api', authRoutes);
// app.use('/', routes);
// app.use('/api/login', login); 



// if(!(process.env.JWT_PRIVATE_KEY)) {
//     console.log('FATAL ERROR: JWT_PRIVATE_KEY is not defined')
//     process.exit(1)
// }


// const port = process.env.PORT || 3000
// app.listen(port,()=> console.log(`Server Started on port ${port}...`))


