"use strict"

var request = require("request");

var apiKey, username;
var apiOpt = {
  url: "http://www.statuscake.com",
  port: 80
};

function reqOpt() {
  var opts = {};
  Object.keys(apiOpt).forEach(function (key) {
    opts[key] = apiOpt[key];
  });
  opts["headers"] = {
    "API": apiKey,
    "Username": username
  };
  return opts;
};

function apiPath(name) {
  return "/API" + name.replace(/^[sg]et/, "").replace(/([A-Z])/g, "_$1").split(/_/).join("/") + "/";
}

function getAPI(name, params, done) {
  var opts = reqOpt();
  opts["method"] = "GET";
  opts["url"] += apiPath(name);
  if (params) {
    opts["url"] += "?" + Object.keys(params).map(function (key) {
      return key + "=" + params[key]
    }).join("&");
  }
  //console.log(opts["url"]);
  request(opts, function (err, res, body) {
    if (err) {
      return done(err, null);
    }
    return done(null, JSON.parse(body));
  });
}

module.exports = function (options) {
  apiKey = options["apiKey"];
  username = options["username"];
  return {
    tests: function () {
      var done = arguments[arguments.length - 1];
      if (arguments.length === 2 && typeof arguments[0] === 'number') {
        return getAPI("getTestsDetails", { TestID: arguments[0] }, done);
      }
      return getAPI("getTests", null, done);
    }
  };
};
