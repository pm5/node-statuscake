
var expect = require("chai").expect;
var statuscake = require("../index");

describe("StatusCake API", function () {
  var api;
  var conf = require("./conf");
  this.timeout(5000);
  beforeEach(function () {
    api = statuscake(conf);
  });

  describe("Tests", function () {

    it("should get all tests", function (done) {
      api.tests(function (err, data) {
        expect(err).is.null;
        expect(data).is.a("array");
        expect(data.length).is.above(0);
        expect(data[0]["TestID"]).is.a("number");
        done();
      });
    });

    it("should get details about one test", function (done) {
      api.tests(conf["TestID"], function (err, data) {
        expect(err).is.null;
        expect(data.TestID).equal(conf["TestID"]);
        done();
      });
    });

  });

});
