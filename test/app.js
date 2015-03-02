
var expect = require("chai").expect;
var conf = require("./conf");
var statuscake = require("..");

describe("StatusCake App", function () {
  var app;
  this.timeout(10000);
  beforeEach(function () {
    app = statuscake(conf);
  });

  describe("Tests", function () {

    it("should get all tests", function (done) {
      app.tests(function (err, data) {
        expect(err).is.null;
        expect(data).is.a("array");
        expect(data.length).is.above(0);
        expect(data[0]["TestID"]).is.a("number");
        done();
      });
    });

    it("should get details about one test", function (done) {
      app.tests(conf["TestID"], function (err, data) {
        expect(err).is.null;
        expect(data.TestID).equal(conf["TestID"]);
        done();
      });
    });

  });

});
