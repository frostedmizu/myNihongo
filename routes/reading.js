const express = require('express');
const router = express.Router();
const Reading = require('../models/reading');
const Translate = require('../models/translate');
const mongoose = require('mongoose');
const passport = require('passport');


// Add Reading
router.post('/addReading', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newReading = new Reading({
    passage: req.body.passage,
    _classId: mongoose.Types.ObjectId(req.body.classId)
  });

  Reading.addReading(newReading, (err, reading) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add passage: ' +err});
    } else {
      res.json({success: true,
        msg: 'Passage added'
      });
    }
  });
});

// Get Reading
router.get('/getReading', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Reading.getReadingsByClassId(req.query.classId, (err, readings) => {
    console.log(err);
    res.json({success: true,
      data: readings
    });
  });
});

router.post('/deleteReading', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Reading.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) }, (err) => {
    if (err) return handleError(err);
    Reading.getReadingsByClassId(req.body.classId, (err, readings) => {
      res.json({success: true,
        data: readings
      });
    });
  });
});

router.post('/addTranslate', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newTranslate = new Translate({
    translateInput: req.body.translateInput,
    translation: req.body.translation,
    username: req.body.username,
    datetime: new Date(),
    _classId: mongoose.Types.ObjectId(req.body.classId)
  });

  Translate.addTranslate(newTranslate, (err, translate) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add translate: ' +err});
    } else {
      res.json({success: true,
        msg: 'Translate added'
      });
    }
  });
});

// Get Translates
router.get('/getTranslates', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Translate.getTranslatesByClassId(req.query.classId, (err, translates) => {
    console.log(err);
    res.json({success: true,
      data: translates
    });
  });
});

module.exports = router;