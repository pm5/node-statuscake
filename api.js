var api = module.exports = {};

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

api.get = function (name, params, opts, done) {
  apiKey = opts["apiKey"];
  username = opts["username"];
  opts = reqOpt();
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
};

api.getTests = function (conf, done) {
  return api.get("getTests", null, conf, done);
};

api.getTestsDetails = function (id, conf, done) {
  return api.get("getTestsDetails", { TestID: id }, conf, done);
};
