"use strict";

var sa = require("superagent");
var API_URL = "http://www.statuscake.com";
var AUTH ={};

var api = module.exports = {};

api.apiPath = function (name) {
  var seg = name[0].toUpperCase().concat(name.substring(1)).replace(/([A-Z])/g, "_$1").split(/_/);
  if (seg.length > 2) {
    seg[1] = seg[1] + "s";
  }
  return "/API" + seg.join("/") + "/";
}

api.get = function (name, done) {
  sa.get(API_URL + api.apiPath(name))
    .set(AUTH)
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
  return api.get("auth", done);
};

api.getTests = function (conf, done) {
  return api.get("getTests", null, conf, done);
};

api.getTestsDetails = function (id, conf, done) {
  return api.get("getTestsDetails", { TestID: id }, conf, done);
};
