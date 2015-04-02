
var expect = require("chai").expect;
var conf = require("./conf");
var sc = require("..");

describe("Authentication", function () {
  this.timeout(10000);
  afterEach(function () {
    sc.clear();
  });

  it("can authenticate user", function (done) {
    sc.username(conf.Username)
      .key(conf.API)
      .auth(function (err, data) {
        expect(data.ErrNo).to.be.undefined;
        expect(data.Success).to.be.true;
        done();
      });
  });
});

