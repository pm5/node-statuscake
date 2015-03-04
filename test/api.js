
var expect = require("chai").expect;
var conf = require("./conf");
var statuscake = require("..");

var TestID = 334980;

describe("StatusCake API", function () {
  this.timeout(10000);
  describe("Tests", function () {
    it("could get all test results", function (done) {
      statuscake.getTests(conf, function (err, data) {
        expect(data.length).is.a("number");
        expect(data[0].TestID).is.a("number");
        done(err);
      });
    });

    it("could get details about a test", function (done) {
      statuscake.getTestsDetails(TestID, conf, function (err, data) {
        expect(data.TestID).equal(TestID);
        expect(data.Method).equal("GET");
        done(err);
      });
    });

    it("could update a test");
  });
});
