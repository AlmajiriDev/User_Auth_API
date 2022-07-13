const Joi = require('joi')
const express = require('express')


function validateUser(user) {
    const schema = {
      first_name: Joi.string().max(50).required(),
      last_name: Joi.string().max(50).required(),
      email: Joi.string().min(5).max(50).required().email(),
      password: Joi.string().min(8).max(50).required()
    };
  
    return Joi.validate(user, schema);
  };


  // exports.User = User;
  exports.validate = validateUser;
