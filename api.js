var api = module.exports = {};

var request = require("request");

var API, Username;
var apiOpt = {
  url: "http://www.statuscake.com",
  port: 80
};

function reqOpt() {
  var opts = {};
  Object.keys(apiOpt).forEach(function (key) {
    opts[key] = apiOpt[key];
  });
  opts.headers = {};
  if (API) {
    opts.headers.API = API;
  }
  if (Username) {
    opts.headers.Username = Username;
  }
  return opts;
};

function apiPath(name) {
  return "/API" + name.replace(/^[sg]et/, "").replace(/([A-Z])/g, "_$1").split(/_/).join("/") + "/";
}

api.get = function (name, params, opts, done) {
  API = opts.API;
  Username = opts.Username;
  opts = reqOpt();
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

api.getTests = function (conf, done) {
  return api.get("getTests", null, conf, done);
};

api.getTestsDetails = function (id, conf, done) {
  return api.get("getTestsDetails", { TestID: id }, conf, done);
};
