
var expect = require("chai").expect;
var conf = require("./conf");
var statuscake = require("..");

describe("StatusCake API", function () {
  var api;
  this.timeout(10000);
  beforeEach(function () {
    api = statuscake.api;
  });
  describe("Tests", function () {
    it("could get all test results", function (done) {
      api.get("getTests", null, conf, function (err, data) {
        expect(data.length).is.a("number");
        expect(data[0].TestID).is.a("number");
        done();
      });
    });

    it("could get details about a test", function (done) {
      api.get("getTestsDetails", conf, conf, function (err, data) {
        expect(data.TestID).equal(conf.TestID);
        expect(data.Method).equal("GET");
        done();
      });
    });
  });
});
