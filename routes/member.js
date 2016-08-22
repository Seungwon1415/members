var express = require('express');
var router = express.Router();
var Member = require('../models/member');

router.get('/:id', function(req, res, next) {
  var memberId = req.params.id;
  Member.findMemberById(memberId, function(err, member) {
    if (err) {
      return next(err);
    }
    res.send({
      member: member
    });
  })
});

router.post('/', function(req, res, next) {
  var member = {}
  member.name = req.body.name;
  member.email = req.body.email;
  member.password = req.body.password;
  Member.registerMember(member, function(err, member) {
    if (err) {
      return next(err);
    }
    res.send({
      member: member
    });
  });
});

module.exports = router;