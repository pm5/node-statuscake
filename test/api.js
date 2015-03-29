
var expect = require("chai").expect;
var conf = require("./conf");
var sc = require("..");

var TestID = 375727;
var TestData = {
  WebsiteName: "node-statuscake API test site",
  WebsiteURL: "https://status.github.com/",
  CheckRate: 300,
  TestType: "HTTP",
};

describe("Tests API", function () {
  this.timeout(10000);
  beforeEach(function () {
    sc.key(conf.API);
    sc.username(conf.Username);
  });
  afterEach(function () {
    sc.clear();
  });

  it.skip("can translate API name to endpoint path", function () {
    expect(sc.apiPath("tests")).to.equal("/API/Tests/");
    expect(sc.apiPath("testDetails")).to.equal("/API/Tests/Details/");
    expect(sc.apiPath("testUpdate")).to.equal("/API/Tests/Update/");
  });

  describe("by requests", function () {
    it("can get all tests", function (done) {
      sc.tests(function (err, data) {
        expect(data.length).to.be.a("number");
        expect(data[0].TestID).to.be.a("number");
        done(err);
      });
    });
    it("can get test details", function (done) {
      sc.test(TestID, function (err, test) {
        expect(test.TestID).equal(TestID);
        expect(test.Method).equal("GET");
        done(err);
      });
    });
    it("can upsert and delete a test", function () {
      sc.test(TestData, function (err, output) {
        expect(err).to.be.null;
        expect(output.Success).to.be.true;
        expect(output.InsertID).to.be.okay;
        var id = output.InsertID;
        sc.testDelete(id, function (err, output) {
          expect(output.Success).to.be.true;
          expect(output.TestID).equal(id);
          done(err);
        });
      });
    });
  });

  describe.skip("with promises", function (done) {
    it("can get test details", function (done) {
      sc.test(TestID)
        .then(function (test) {
          expect(test.TestID).equal(TestID);
          done();
        });
    });
    it("can upsert and delete a test", function (done) {
      var id;
      sc.test(TestData)
        .then(function (test) {
          expect(id = test.TestID).to.be.a("number");
          expect(test.WebsiteName).to.equal(TestData.WebsiteName);
          return test.update({
            WebsiteHost: "GitHub",
          });
        })
        .then(function (test) {
          expect(test.WebsiteHost).to.equal("GitHub");
          return test.delete();
        })
        .then(function (result) {
          expect(result.TestID).to.equal(id);
          expect(result.Success).to.be.true;
        })
        .then(done);
    });
  });
});
