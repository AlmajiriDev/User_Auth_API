const { User }  = require('../models/users');
const Joi = require('joi')
const { validate } = require('../middleware/joi_validator')
const bcrypt = require("bcrypt")



const postController = {   
    dashboard:  async (req, res) => {
        res.send('This shows a dashboard of authenticated users') //to be  handled later
        }
    }


module.exports = postController