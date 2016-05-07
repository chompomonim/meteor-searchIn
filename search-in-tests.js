// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by search-in.js.
import { name as packageName } from "meteor/search-in";

// Write your tests here!
// Here is an example.
Tinytest.add('search-in - example', function (test) {
  test.equal(packageName, "search-in");
});
