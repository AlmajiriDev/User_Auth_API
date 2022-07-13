const dbConfig = require('../config/dbConfig')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql'
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('../models/users')(sequelize, Sequelize)
db.role = require('../models/roles')(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
})

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"]


module.exports = db;
module.exports = sequelize;


