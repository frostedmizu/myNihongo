const mongoose = require('mongoose');

// Reading Answer Schema
const ReadingAnswerSchema = mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  _readingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reading'
  },
  username: {
    type: String,
    required: true
  },
  _classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }
});

const  ReadingAnswer = module.exports = mongoose.model(' ReadingAnswer',  ReadingAnswerSchema);

module.exports.addReadingAnswer = function(newReadingAnswer, callback){
  const query =
    {
      _classId: newReadingAnswer._classId,
      _readingId: newReadingAnswer._readingId,
      username: newReadingAnswer.username
    };
  ReadingAnswer.findOneAndUpdate(query, newReadingAnswer, {upsert:true, useFindAndModify:false}, callback);
}

module.exports.getReadingAnswerByClassId = function(classId, callback){
  const query = {_classId: mongoose.Types.ObjectId(classId)};
  return ReadingAnswer.find(query, callback);
}

module.exports.getReadingAnswer = function(obj, callback){
  const query =
    {
      _classId: mongoose.Types.ObjectId(obj.classId),
      _readingId: mongoose.Types.ObjectId(obj.readingId),
      username: obj.username
    };

  return ReadingAnswer.find(query, callback);
}
