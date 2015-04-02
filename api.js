"use strict";

var sa = require("superagent");
var API_URL = "https://www.statuscake.com/API";
var AUTH ={};

var api = module.exports = {};

function bodyParser() {
  return function (req) {
    req.end = function (done) {
      Object.getPrototypeOf(req).end.call(req, function (err, res) {
        done(err, res.body);
      });
    };
  };
}

function paramParser() {
  function parse(param) {
    if (typeof param === "object") return param;
    if (typeof param === "number") return { TestID: param };
    return {};
  }
  return function (req) {
    req.query = function () {
      return Object.getPrototypeOf(req).query.call(req, parse.apply(null, arguments));
    };
    req.send = function () {
      return Object.getPrototypeOf(req).send.call(req, parse.apply(null, arguments));
    };
  };
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
  "/Tests/Periods": "get",
  "/Tests/Checks": "get",
  "/ContactGroups": "get",
  "/ContactGroups/Update": "put",
  "/Alerts": "get",
};

Object.keys(methods).forEach(function (path) {
  if (methods[path] === "get") {
    api[methodName(path)] = function () {
      var done = arguments[arguments.length - 1];
      var agent = sa(API_URL + path)
        .set(AUTH)
        .use(bodyParser())
        .use(paramParser());
      if (arguments.length > 1) {
        agent.query(arguments[0]);
      }
      return agent.end(done);
    };
  } else if (methods[path] === "put") {
    api[methodName(path)] = function (data, done) {
      return sa.put(API_URL + path)
        .set(AUTH)
        .use(bodyParser())
        .use(paramParser())
        .type("form")
        .send(data)
        .end(done);
    }
  }
});

api.testsDelete = function (id, done) {
  sa.del(API_URL + "/Tests/Details")
    .set(AUTH)
    .use(bodyParser())
    .query({ TestID: id })
    .end(done);
};
