
var expect = require("chai").expect;
var conf = require("./conf");
var sc = require("..");

var TestID = 375727;

describe("StatusCake API", function () {
  this.timeout(10000);

  describe("Authentication", function () {
    afterEach(function () {
      sc.clear();
    });
    it("can authenticate user", function (done) {
      sc.username(conf.Username);
      sc.key(conf.API);
      sc.authenticate(function (err, data) {
        if (err) return done(err);
        expect(data.Details.Username).to.equal(conf.Username);
        expect(data.ErrNo).to.be.undefined;
        done();
      });
    });
    it("can authenticate user with configuration object", function (done) {
      sc.authenticate(conf, function (err, data) {
        if (err) return done(err);
        expect(data.Details.Username).equal(conf.Username);
        expect(data.ErrNo).to.be.undefined;
        done();
      });
    });
  });

  it("can translate API name to endpoint path", function () {
    expect(sc.apiPath("tests")).to.equal("/API/Tests/");
    expect(sc.apiPath("testDetails")).to.equal("/API/Tests/Details/");
    expect(sc.apiPath("testUpdate")).to.equal("/API/Tests/Update/");
  });

  //describe("Tests", function () {
    //it("can get all tests", function (done) {
      //sc.tests(conf, function (err, data) {
        //expect(data.length).to.be.a("number");
        //expect(data[0].TestID).to.be.a("number");
        //done(err);
      //});
    //});

    //it("can get detailed test data", function (done) {
      //sc.testDetails(TestID, conf, function (err, data) {
        //expect(data.TestID).equal(TestID);
        //expect(data.Method).equal("GET");
        //done(err);
      //});
    //});

    //it("can insert and delete a test", function () {
      //var data = {
        //WebsiteName: "node-statuscake API test site",
        //WebsiteURL: "https://status.github.com/",
        //CheckRate: 300,
        //TestType: "HTTP",
      //};
      //sc.testUpdate(data, function (err, output) {
        //expect(err).to.be.null;
        //expect(output.Success).to.be.true;
        //expect(output.InsertID).to.be.okay;
        //var updatedID = output.InsertID;
        //sc.testDelete(updatedID, function (err, output) {
          //expect(output.Success).to.be.true;
          //expect(output.TestID).equal(updatedID);
          //done(err);
        //});
      //});
    //});
  //});
});
