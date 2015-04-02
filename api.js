"use strict";

var sa = require("superagent");
var API_URL = "https://www.statuscake.com/API";
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

api.test = function () {
  var done = arguments[arguments.length - 1];
  var id, data;
  if (arguments.length === 2 && typeof arguments[0] === "number") {
    id = arguments[0];
    return sa(API_URL + "/Tests/Details")
      .set(AUTH)
      .query({TestID: id})
      .end(bodyParser(done));
  } else if (arguments.length === 3) {
    id = arguments[0];
    data = arguments[1];
    data.TestID = id;
    return sa.put(API_URL + "/Tests/Update")
      .set(AUTH)
      .type("form")
      .send(data)
      .end(bodyParser(done));
  } else if (typeof arguments[0] === "object") {
    data = arguments[0];
    return sa.put(API_URL + "/Tests/Update")
      .set(AUTH)
      .type("form")
      .send(data)
      .end(bodyParser(done));
  }
  done("Wrong arguments.", undefined);
};

api.testDelete = function (id, done) {
  sa.del(API_URL + "/Tests/Details")
    .set(AUTH)
    .query({ TestID: id })
    .end(bodyParser(done));
};

