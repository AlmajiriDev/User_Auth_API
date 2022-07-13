// const { DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => { 
  const User = sequelize.define('user', {
    user_id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },

    first_name: { 
      type: DataTypes.STRING, 
      allowNull:false 
    },

    last_name: { 
      type: DataTypes.STRING, 
      allowNull:false 
    },
    
    email: 
    { 
      type: DataTypes.STRING, 
      unique: true,
      allowNull:false 
    },
    password: 
    { 
      type: DataTypes.STRING, 
      allowNull:false 
    },
  
    myDate: { 
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW 
      },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })
  
  return User
}



