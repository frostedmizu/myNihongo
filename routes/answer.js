const express = require('express');
const router = express.Router();
const Score = require('../models/score');
const mongoose = require('mongoose');
const passport = require('passport');
const ReadingAnswer = require('../models/readingAnswer');

// Add Score
router.post('/addScore', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newScore = {
    correct: req.body.correct,
    _questionId: mongoose.Types.ObjectId(req.body.questionId),
    level: req.body.level,
    username: req.body.username,
    _classId: mongoose.Types.ObjectId(req.body.classId)
  };

  Score.addScore(newScore, (err, score) => {
    if(err) {
      console.log("err: " + err);
      res.json({success: false, msg: 'Failed to add score'});
    } else {
      res.json({success: true,
        msg: 'Score added'
      });
    }
  });
});

// Get Scores
router.get('/getScores', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Score.getScoresByClassId(req.query.classId, (err, scores) => {
    res.json({success: true,
      data: scores
    });
  });
});

router.post('/deleteScores', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Score.deleteMany({ _classId: mongoose.Types.ObjectId(req.body.classId) }, (err) => {
    if (err) return handleError(err);
    Score.getScoresByClassId(req.body.classId, (err, scores) => {
      res.json({success: true,
        data: scores
      });
    });
  });
});

// Add Reading Answer
router.post('/addReadingAnswer', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newReadingAnswer = {
    answer: req.body.answer,
    _readingId: mongoose.Types.ObjectId(req.body.readingId),
    username: req.body.username,
    _classId: mongoose.Types.ObjectId(req.body.classId)
  };

  ReadingAnswer.addReadingAnswer(newReadingAnswer, (err, readingAnswer) => {
    if(err) {
      console.log("err: " + err);
      res.json({success: false, msg: 'Failed to add answer'});
    } else {
      res.json({success: true,
        msg: 'Answer added'
      });
    }
  });
});

// Get Reading Answer
router.get('/getReadingAnswers', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  ReadingAnswer.getReadingAnswerByClassId(req.query.classId, (err, answers) => {
    res.json({success: true,
      data: answers
    });
  });
});


module.exports = router;