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

api.pathToMethodName = function (path) {
  return path.slice(1).split("/").map(function (s, i) {
    if (i === 0) return s.toLowerCase()
    else if (s === s.toLowerCase()) return s.toUpperCase()
    else return s[0].toUpperCase().concat(s.slice(1).toLowerCase());
  }).join("");
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
    api[api.pathToMethodName(path)] = function () {
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
    api[api.pathToMethodName(path)] = function (data, done) {
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
