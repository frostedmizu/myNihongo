const mongoose = require('mongoose');

// Question Schema
const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  choiceA: {
    type: String,
    required: true
  },
  choiceB: {
    type: String,
    required: true
  },
  choiceC: {
    type: String,
    required: true
  },
  choiceD: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  _classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }
});

const Question = module.exports = mongoose.model('Question', QuestionSchema);

module.exports.addQuestion = function(newQuestion, callback){
  newQuestion.save(callback);
}

module.exports.getQuestionsByClassId = function(classId, callback){
  const query = {_classId: mongoose.Types.ObjectId(classId)};
  return Question.find(query, callback);
}
