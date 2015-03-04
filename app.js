var api = require("./api");

var app = module.exports = function (options) {
  var opts = options;
  API = options.API;
  Username = options.Username;
  return {
    set: function (key, val) {

    },
    tests: function () {
      var done = arguments[arguments.length - 1];
      if (arguments.length === 2 && typeof arguments[0] === 'number') {
        return api.get("getTestsDetails", { TestID: arguments[0] }, { API: API, Username: Username }, done);
      }
      return api.get("getTests", null, { API: API, Username: Username }, done);
    }
  };
};
