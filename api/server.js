const express = require('express');

const server = express();



// remember express by default cannot parse JSON in request bodies
server.use(express.json())
// global middlewares and the user's router need to be connected here

const Users = require('./users/users-model')
// const Register = require('./register/register-model')
// const Login = require('./login/login-model')

// User Endpoint
/*| GET    | /api/users    | Returns an array users.   */
server.get('/api/users', (req, res) => {
    Users.find(req.query)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({
            message: "The users information could not be retrieved" 
        })
    })
});

// Register Endpoint
server.post('/api/register', (req, res) => {
    let user = req.body
    Users.addNewUser(user)
        .then(newUser => {
            if(!newUser) {
                res.status(400).json({message: "Please provide name and password for the user"})
            } else {
                res.status(201).json(newUser);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database" 
            })
        })
})

// Login Endpoint
server.post('/api/login', (req, res) => {
    let user = req.body
    Users.checkLoginInfo(user)
        .then(verifiedUser => {
            if(!verifiedUser) {
                 res.status(404).json({
                message: "User credentials invalid"
                }) 
            } else {
                res.json({
                    message: `Welcome back, ${verifiedUser.name}!`
                })
            }
        })
        .catch(err => {
          res.status(500).json({
              message: "error retrieving informatin from server"
          })
        })
})

// General Endpoint
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Export
module.exports = server;