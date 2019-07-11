const mongoose = require('mongoose');

// Class Schema
const ClassSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Class = module.exports = mongoose.model('Class', ClassSchema);

module.exports.getClassById = function(id, callback){
  Class.findById(id, callback);
}

module.exports.addClass = function(newClass, callback){
  console.log("Name: " + newClass.name);
  newClass.save(callback);
}
