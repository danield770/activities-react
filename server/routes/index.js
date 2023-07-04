var express = require('express');
var router = express.Router();

var activitiesV1 = require('./activities/v1');
var activitiesV2 = require('./activities/v2');

// GET ACTIVITIES V1
router.get('/activities/v1', function (req, res) {
  res.send(activitiesV1)
})

// GET ACTIVITIES V2
router.get('/activities/v2', function (req, res) {
  res.send(activitiesV2)
})

module.exports = router;