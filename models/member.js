var mysql = require('mysql');
var async = require('async');
var dbPool = require('./common').dbPool;

function findMemberById(id, callback) {
  var sql = 'select id, name, email from member where id = ?';
  dbPool.getConnection(function(err, dbConn) {
    if (err) {
      return callback(err);
    }
    dbConn.query(sql, [id], function(err, results) {
      dbConn.release();
      if (err) {
        return callback(err);
      }
      var member = {};
      member.id = results[0].id;
      member.name = results[0].name;
      member.email = results[0].email;
      callback(null, member);
    });
  });
}

function registerMember(member, callback) {
  var sql = 'insert into member(name, email, password) value (?, ?, sha2(?, 512))';
  dbPool.getConnection(function(err, dbConn) {
    if (err) {
      return callback(err);
    }
    dbConn.query(sql, [member.name, member.email, member.password], function(err, result) {
      dbConn.release();
      if (err) {
        return callback(err);
      }
      member.id = result.insertId;
      delete member.password;
      callback(null, member);
    });
  });
}

module.exports.findMemberById = findMemberById;
module.exports.registerMember = registerMember;