"use strict";

var sa = require("superagent");
var API_URL = "http://www.statuscake.com/API";
var AUTH ={};

var api = module.exports = {};

api.get = function () {
  var path = arguments[0];
  var param = {};
  var done = arguments[arguments.length - 1];
  if (arguments.length === 3) {
    param = arguments[1];
  }
  sa.get(API_URL + path)
    .set(AUTH)
    .query(param)
    .end(function (err, res) {
      done(err, res.body);
    });
};

api.delete = function () {
  var path = arguments[0];
  var param = {};
  var done = arguments[arguments.length - 1];
  if (arguments.length === 3) {
    param = arguments[1];
  }
  sa.delete(API_URL + path)
    .set(AUTH)
    .query(param)
    .end(function (err, res) {
      done(err, res.body);
    });
};

api.clear = function () {
  AUTH = {};
};

api.key = function (key) {
  if (arguments.length === 1) {
    AUTH.API = key;
  }
  return AUTH.API;
};

api.username = function (username) {
  if (arguments.length === 1) {
    AUTH.Username = username
  }
  return AUTH.Username;
};

api.authenticate = function () {
  var done = arguments[0];
  if (arguments.length === 2) {
    var conf = arguments[0];
    done = arguments[1];
    if (conf.API) api.key(conf.API);
    if (conf.Username) api.username(conf.Username);
  }
  return api.get("/Auth", done);
};

api.tests = function (done) {
  return api.get("/Tests", done);
};

api.test = function (id, done) {
  return api.get("/Tests/Details", { TestID: id }, done);
};

api.testDelete = function (id, done) {
  return api.delete("/Tests/Details", { TestID: id }, done);
};
