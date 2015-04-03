
var expect = require("chai").expect;
var sc = require("..");

describe("API Helper", function () {
  it("can translate API path to method names", function () {
    expect(sc.pathToMethodName("/Tests/Periods")).to.equal("testsPeriods");
    expect(sc.pathToMethodName("/Alerts")).to.equal("alerts");
    expect(sc.pathToMethodName("/Locations/json")).to.equal("locationsJSON");
  });
});
