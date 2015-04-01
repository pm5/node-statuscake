"use strict";

var sa = require("superagent");
var API_URL = "http://www.statuscake.com/API";
var AUTH ={};

var api = module.exports = {};

function bodyParser(done) {
  return function (err, res) {
    done(err, res.body);
  };
}

api.clear = function () {
  AUTH = {};
};

api.key = function (key) {
  if (arguments.length === 1) {
    AUTH.API = key;
  }
  return this;
};

api.username = function (username) {
  if (arguments.length === 1) {
    AUTH.Username = username
  }
  return this;
};

api.authenticate = function () {
  var done = arguments[0];
  if (arguments.length === 2) {
    var conf = arguments[0];
    done = arguments[1];
    if (conf.API) api.key(conf.API);
    if (conf.Username) api.username(conf.Username);
  }
  return sa(API_URL + "/Auth")
    .set(AUTH)
    .end(bodyParser(done));
};

api.tests = function (done) {
  return sa(API_URL + "/Tests")
    .set(AUTH)
    .end(bodyParser(done))
};

api.test = function (id, done) {
  return sa(API_URL + "/Tests/Details")
    .set(AUTH)
    .query({ TestID: id })
    .end(bodyParser(done));
};

api.testDelete = function (id, done) {
  sa.delete(API_URL + "/Tests/Details")
    .set(AUTH)
    .query({ TestID: id })
    .end(bodyParser(done));
};

