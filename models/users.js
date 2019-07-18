const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Class = require('../models/class');
const uniqueValidator = require('mongoose-unique-validator');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  _classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  className: {
    type: String,
    required: false
  }
});

UserSchema.plugin(uniqueValidator, {message: 'userExists'});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username.toUpperCase()};
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  if(newUser.role === "teacher") {
    let newClass = new Class({
      name: newUser.className
    });

    Class.addClass(newClass, (err, addedClass) => {
      if(err) {
        console.log(err);
      } else {
        newUser._classId = addedClass._id;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.username = newUser.username.toUpperCase();
            newUser.save(callback);
          });
        });
      }
    });
  } else {
    Class.getClassById(newUser._classId, (err, usersClass) => {
      if(err) throw err;
      newUser._classId = usersClass._id;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
        });
      });
    });

  }
}

module.exports.comparePassword = function(enteredPassword, hash, callback){
  bcrypt.compare(enteredPassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}