const { equal, deepEqual } = require("assert");
const { addEndPoint, getTrimmedValue, getObject } = require("./lib.js");

const data = ["one", "two", "three", "four", "five", "six"];
const headers = ["Name", "EmployeeId", "Phone", "Salary"];
const line1 = "Sam        22543         88098654XX         25000";
const line2 = "Catherine  22123         NULL               3000";
const startPoints = [0, 11, 25, 44, 50];

describe("addEndPoint", function() {
  it("should return max length from array of strings", function() {
    equal(addEndPoint(data), 5);
  });
});

describe("getTrimmedValue", function() {
  it("should return first value from line after trimming", function() {
    equal(getTrimmedValue(line1, startPoints, 0), "Sam");
  });

  it("should return second value from line after trimming", function() {
    equal(getTrimmedValue(line2, startPoints, 1), "22123");
  });

  it("should return third value from line after trimming", function() {
    equal(getTrimmedValue(line1, startPoints, 2), "88098654XX");
  });

  it("should return fourth value from line after trimming", function() {
    equal(getTrimmedValue(line2, startPoints, 3), "3000");
  });
});

describe("getObject", function() {
  const expectedOutputForLine1 = {
    Name: "Sam",
    EmployeeId: "22543",
    Phone: "88098654XX",
    Salary: "25000"
  };
  const expectedOutputForLine2 = {
    Name: "Catherine",
    EmployeeId: "22123",
    Phone: "NULL",
    Salary: "3000"
  };
  it("should return an object of headers and values given headers and a string of values", function() {
    deepEqual(getObject(line1, headers, startPoints), expectedOutputForLine1);
  });
  it("should return an object of headers and values given headers and a string of different values", function() {
    deepEqual(getObject(line2, headers, startPoints), expectedOutputForLine2);
  });
});
