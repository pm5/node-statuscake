
var expect = require("chai").expect;
var sc = require("..");

describe("Locations API", function () {
  this.timeout(10000);
  it("can get StatusCake test server locations", function (done) {
    sc.locationsJSON(function (err, data) {
      expect(data).to.be.an("object");
      expect(data["1"].ip).to.be.a("string");
      expect(data["1"].status).to.equal("Up");
      done(err)
    });
  });
})
