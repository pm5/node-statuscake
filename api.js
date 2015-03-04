var api = module.exports = {};

var request = require("request");

var auth = {};

var apiOpt = {
  url: "http://www.statuscake.com",
  port: 80
};

function reqOpt() {
  var opts = {};
  Object.keys(apiOpt).forEach(function (key) {
    opts[key] = apiOpt[key];
  });
  opts.headers = auth;
  return opts;
};

function apiPath(name) {
  return "/API" + name.replace(/^[sg]et/, "").replace(/([A-Z])/g, "_$1").split(/_/).join("/") + "/";
}

api.get = function (name, params, conf, done) {
  var opts = reqOpt();
  if (conf) { opts.headers = conf; }
  opts["method"] = "GET";
  opts["url"] += apiPath(name);
  if (params) {
    opts["url"] += "?" + Object.keys(params).map(function (key) {
      return key + "=" + params[key]
    }).join("&");
  }
  request(opts, function (err, res, body) {
    if (err) {
      return done(err, null);
    }
    return done(null, JSON.parse(body));
  });
};

api.clear = function () {
  auth = {};
};

api.set = function (name, value) {
  if (name === "API") { auth.API = value; }
  if (name === "Username") { auth.Username = value; }
}

api.authenticate = function () {
  if (arguments.length === 1) {
    return api.get("getAuth", null, auth, arguments[0]);
  }
  return api.get("getAuth", null, arguments[0], arguments[1]);
};

api.getTests = function (conf, done) {
  return api.get("getTests", null, conf, done);
};

api.getTestsDetails = function (id, conf, done) {
  return api.get("getTestsDetails", { TestID: id }, conf, done);
};
