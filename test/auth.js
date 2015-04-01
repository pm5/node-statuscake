
var expect = require("chai").expect;
var conf = require("./conf");
var sc = require("..");

describe("Authentication", function () {
  this.timeout(10000);
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

