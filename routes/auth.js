const { verifySignUp } = require("../middleware")
const authController = require('../controllers/authController')
const adminAuthController = require('../controllers/adminAuthController')
const router = express.Router()

//Register route

router.post('/register',  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
    ],
    authController.createUser
)


//Addmin Register route
router.post('/admin/register', adminAuthController.createUser)


//login route
// router.post('/', authController.login)


//logout route
// router.post('/', authController.logout)



module.exports = router






















//   //USINGG NORMAL MYSQL = everything wokrs but the goal is to use sequelize
//   //which makes this approach obsolete

//   // db.getConnection( async (err, connection) => {
//   //   if (err) throw (err)
//   //   const sqlSearch = "SELECT * FROM user_table WHERE email = email"
//   //   const search_query = mysql.format(sqlSearch,[email])
//   //   const sqlInsert = "INSERT INTO user_table VALUES (0,?,?,?,?)"
//   //   const insert_query = mysql.format(sqlInsert,[first_name,last_name, email, hashed_password])
    
//   //   await connection.query(search_query, async (err, result) => { 
//   //     if (err) throw (err)   
//   //     console.log("------> Search Results")
//   //     console.log(result.length)
//   //     if (result.length != 0) {
//   //       connection.release()
//   //       console.log("------> User already exists")
//   //       res.sendStatus(409) 
//   //     } 
//   //     else {
//   //       await connection.query (insert_query, (err, result)=> {
//   //         connection.release()
//   //         if (err) throw (err)
//   //         console.log ("--------> Created new User")
//   //         console.log(result.insertId)
//   //         res.sendStatus(201)
//   //       })
//   //     }  
//   //   })

      
//   // })

// })
// module.exports = router
