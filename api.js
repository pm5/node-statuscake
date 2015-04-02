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

function paramParser(param) {
  if (typeof param === "object") return param;
  if (typeof param === "number") return { TestID: param };
  return {};
}

function methodName(path) {
  return path[1].toLowerCase().concat(path.replace(/\//g, "").slice(1));
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

var methods = {
  "/Auth": "get",
  "/Tests": "get",
  "/Tests/Details": "get",
  "/Tests/Update": "put",
};

Object.keys(methods).forEach(function (path) {
  if (methods[path] === "get") {
    api[methodName(path)] = function () {
      var done = arguments[arguments.length - 1];
      var agent = sa(API_URL + path).set(AUTH);
      if (arguments.length > 1) {
        agent.query(paramParser(arguments[0]));
      }
      return agent.end(bodyParser(done));
    };
  } else if (methods[path] === "put") {
    api[methodName(path)] = function (data, done) {
      return sa.put(API_URL + path)
        .set(AUTH)
        .type("form")
        .send(paramParser(data))
        .end(bodyParser(done));
    }
  }
});

api.testsDelete = function (id, done) {
  sa.del(API_URL + "/Tests/Details")
    .set(AUTH)
    .query({ TestID: id })
    .end(bodyParser(done));
};
