
var expect = require("chai").expect;
var conf = require("./conf");
var sc = require("..");

var TestID = 378573;
var TestData = {
  WebsiteName: "node-statuscake testcase",
  WebsiteURL: "https://status.github.com/",
  CheckRate: 300,
  TestType: "HTTP",
  TestTags: "testcase",
};

describe("Tests API", function () {
  this.timeout(20000);
  beforeEach(function () {
    sc.key(conf.API)
      .username(conf.Username);
  });
  afterEach(function () {
    sc.clear();
  });

  describe("with callbacks", function () {
    it("can get all tests", function (done) {
      sc.tests(function (err, data) {
        expect(err).to.be.null;
        expect(data.length).to.be.a("number");
        expect(data[0].TestID).to.be.a("number");
        done(err);
      });
    });
    it("can get test details", function (done) {
      sc.testsDetails(TestID, function (err, test) {
        expect(test.TestID).equal(TestID);
        expect(test.Method).equal("GET");
        done(err);
      });
    });
    it("can create a test", function (done) {
      sc.testsUpdate(TestData, function (err, output) {
        expect(err).to.be.null;
        expect(output).to.be.an("object");
        expect(output.Success).to.be.true;
        expect(output.InsertID).to.be.okay;
        sc.testsDelete(output.InsertID, done);
      });
    });
    it("can delete a test", function (done) {
      sc.testsUpdate(TestData, function (err, output) {
        var id = output.InsertID;
        sc.testsDelete(id, function (err, output) {
          expect(err).to.be.null;
          expect(output.Success).to.be.true;
          sc.testsDetails(id, function (err, data) {
            expect(data.ErrNo).to.equal(1);
            done();
          });
        });
      });
    });
    it("can update a test", function (done) {
      sc.testsUpdate(TestData, function (err, output) {
        var id = output.InsertID;
        sc.testsUpdate({ TestID: id, CheckRate: 600 }, function (err, output) {
          expect(err).to.be.null;
          expect(output.Success).to.be.true;
          sc.testsDetails(id, function (err, data) {
            expect(data.CheckRate).to.equal(600);
            sc.testsDelete(id, done);
          });
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
