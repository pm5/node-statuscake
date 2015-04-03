
StatusCake
==========

[StatusCake API][apidoc] client library for Node.js.

[apidoc]: https://www.statuscake.com/api/

Usage
-----

```
var statuscake = require("statuscake");

statuscake
  .username("Clapton")
  .key("IGotTheKeyToTheHighway");

statuscake.tests(function (err, allTests) {
  // ...
});
```

List of methods:

* `auth(callback)`
* `tests(callback)`
* `testsDetails(id, callback)`
* `testsUpdate(data, callback)`
* `testsPeriods(id, callback)`
* `testsDelete(id, callback)`
* `testsChecks(id, callback)`
* `contactGroups(callback)`
* `contactGroupsUpdate(data, callback)`
* `alerts(callback)` and `alerts(id, callback)`
* `locationsJSON(callback)`
* `locationsXML(callback)`
* `locationsTXT(callback)`

All callbacks take `(err, data)` as parameters.

See [StatusCake API Documentation][apidoc] for their usages.
