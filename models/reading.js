const mongoose = require('mongoose');

// Reading Schema
const ReadingSchema = mongoose.Schema({
  passage: {
    type: String,
    required: true
  },
  _classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }
});

const Reading = module.exports = mongoose.model('Reading', ReadingSchema);

module.exports.addReading = function(newReading, callback){
  newReading.save(callback);
}

module.exports.getReadingsByClassId = function(classId, callback){
  const query = {_classId: mongoose.Types.ObjectId(classId)};
  return Reading.find(query, callback);
}
