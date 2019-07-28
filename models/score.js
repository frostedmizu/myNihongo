const mongoose = require('mongoose');

// Score Schema
const ScoreSchema = mongoose.Schema({
  correct: {
    type: Boolean,
    required: true
  },
  _questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  level: {
    type: Number,
    required: true
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

const  Score = module.exports = mongoose.model(' Score',  ScoreSchema);

module.exports.addScore = function(newScore, callback){
  const query =
    {
      _classId: newScore._classId,
      _questionId: newScore._questionId,
      username: newScore.username
    };
  Score.findOneAndUpdate(query, newScore, {upsert:true, useFindAndModify:false}, callback);
}

module.exports.getScoresByClassId = function(classId, callback){
  const query = {_classId: mongoose.Types.ObjectId(classId)};
  return Score.find(query, callback);
}

module.exports.getScore = function(obj, callback){
  const query =
    {
      _classId: mongoose.Types.ObjectId(obj.classId),
      _questionId: mongoose.Types.ObjectId(obj.questionId),
      username: obj.username
    };

  return Score.find(query, callback);
}
