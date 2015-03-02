var api = require("./api");

module.exports = function (options) {
  var opts = options;
  apiKey = options["apiKey"];
  username = options["username"];
  return {
    set: function (key, val) {

    },
    tests: function () {
      var done = arguments[arguments.length - 1];
      if (arguments.length === 2 && typeof arguments[0] === 'number') {
        return api.get("getTestsDetails", { TestID: arguments[0] }, { apiKey: apiKey, username: username }, done);
      }
      return api.get("getTests", null, { apiKey: apiKey, username: username }, done);
    }
  };
};