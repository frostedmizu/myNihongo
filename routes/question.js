const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const mongoose = require('mongoose');
const passport = require('passport');

// Add Question
router.post('/addQuestion', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newQuestion = new Question({
    question: req.body.question,
    choiceA: req.body.choiceA,
    choiceB: req.body.choiceB,
    choiceC: req.body.choiceC,
    choiceD: req.body.choiceD,
    answer: req.body.answer,
    level: req.body.level,
    _classId: mongoose.Types.ObjectId(req.body.classId)
  });

  Question.addQuestion(newQuestion, (err, question) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add question'});
    } else {
      res.json({success: true,
        msg: 'Question added'
      });
    }
  });
});

// Get Questions
router.get('/getQuestions', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Question.getQuestionsByClassId(req.query.classId, (err, questions) => {
    res.json({success: true,
      data: questions
    });
  });
});

router.post('/deleteQuestion', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Question.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) }, (err) => {
    if (err) return handleError(err);
    Question.getQuestionsByClassId(req.body.classId, (err, questions) => {
      res.json({success: true,
        data: questions
      });
    });
  });
});

module.exports = router;