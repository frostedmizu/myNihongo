const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config= require('../config/database');
const mongoose = require('mongoose');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    className: req.body.className,
    _classId: mongoose.Types.ObjectId(req.body.classId)

  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      if(err.message && err.message.includes("userExists")) {
        res.json({success: false, msg: 'Username taken'});
      } else {
        res.json({success: false, msg: 'Failed to register user'});
      }
    } else {
      res.json({success: true,
        msg: 'User registered'
      });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  console.log(password);

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    console.log(user);
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week in seconds
        });

        res.json({
          success: true,
          token: token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            classId: user._classId
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });

  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;