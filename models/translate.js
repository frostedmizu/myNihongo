const mongoose = require('mongoose');

// Translate Schema
const TranslateSchema = mongoose.Schema({
  translateInput: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  datetime: {
    type: String,
    required: true
  },
  _classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }
});

const Translate = module.exports = mongoose.model('Translate', TranslateSchema);

module.exports.addTranslate = function(newTranslate, callback){
  newTranslate.save(callback);
}

module.exports.getTranslatesByClassId = function(classId, callback){
  const query = {_classId: mongoose.Types.ObjectId(classId)};
  return Translate.find(query, callback);
}
