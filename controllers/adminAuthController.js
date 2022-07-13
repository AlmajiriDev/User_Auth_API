const { Sequelize, Model, DataTypes } = require('sequelize')
// const User = require('../models/users');
const sequelize = require('../util/database')
var jwt = require("jsonwebtoken");
const Joi = require('joi')
const { validate } = require('../middleware/joi_validator')
const bcrypt = require("bcrypt");
const db = require("../models");
const dbConfig = require('../config/dbConfig');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// Create New USer
exports.createUser = async (req, res, next) => {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
      
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const hashed_password = await bcrypt.hash(req.body.password,10)
        
        User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashed_password
        }).then(user => {
            if (req.body.roles) {
              Role.findAll({
                where: {
                  name: {
                    [Op.or]: req.body.roles
                  }
                }
              }).then(roles => {
                user.setRoles(roles).then(() => {
                  res.send({ message: "User was registered successfully!" });
                });
              });
            } else {
              // user role = 1
              user.setRoles([1]).then(() => {
                res.send({ message: "Admin User was registered successfully!" });
              });
            }
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          })
      }

// Login Admin
exports.login = (req, res) => {
    User.findOne({
        where: {
        email: req.body.email
        }
    })
        .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." })
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) {
            return res.status(401).send({accessToken: null, message: "Invalid Password!"})
        }
        var token = jwt.sign({ id: user.id }, dbConfig.secret, {
            expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
            id: user.id,
            email: user.email,
            roles: authorities,
            accessToken: token
            });
        });
        })
        .catch(err => {
        res.status(500).send({ message: err.message });
        });
    };      
    


    // logout: async (req, res) => {
        
    // }
