const { equal, deepEqual } = require("assert");
const {
  addEndPoint,
  getTrimmedValue,
  getObject,
  addCharToHeader,
  pushHeaderInHeaders
} = require("../src/lib");

const data = ["one", "two", "three", "four", "five", "six"];
const inputHeaders = ["Name", "EmployeeId", "Phone", "Salary"];
const headerLine = "Name       EmployeeId    Phone              Salary";
const line1 = "Sam        22543         88098654XX         25000\r";
const line2 = "Catherine  22123         NULL               3000\r";
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
    deepEqual(
      getObject(line1, inputHeaders, startPoints),
      expectedOutputForLine1
    );
  });
  it("should return an object of headers and values given headers and a string of different values", function() {
    deepEqual(
      getObject(line2, inputHeaders, startPoints),
      expectedOutputForLine2
    );
  });
});

describe("addCharToHeader", function() {
  it("should add character to header if character is not WS nor CR and return that header", function() {
    equal(addCharToHeader("o", "hell"), "hello");
  });
  it("should not add character to header if character is WS and return that header", function() {
    equal(addCharToHeader(" ", "hell"), "hell");
  });
  it("should not add character to header if character is CR and return that header", function() {
    equal(addCharToHeader("\r", "hell"), "hell");
  });
});

describe("pushHeaderInHeaders", function() {
  it("should add header in headers if character is CR and previous is not WS and return headers and empty header", function() {
    const inputHeaders = ["Name", "EmployeeId", "Phone", "Salary"];
    const headers1 = ["Name", "EmployeeId", "Phone", "Salary", "Email"];
    const expectedOutput1 = {
      header: "",
      headers: headers1
    };
    deepEqual(
      pushHeaderInHeaders("\r", line1, 49, inputHeaders, "Email"),
      expectedOutput1
    );
  });

  it("should not add header in headers if previous character is WS and return headers and header", function() {
    const inputHeaders = ["Name", "EmployeeId", "Phone", "Salary"];
    const headers2 = ["Name", "EmployeeId", "Phone", "Salary"];
    const expectedOutput2 = {
      header: "Email",
      headers: headers2
    };
    deepEqual(
      pushHeaderInHeaders("\r", line1, 42, inputHeaders, "Email"),
      expectedOutput2
    );
  });

  it("should not add header in headers if character is not CR and return headers and header", function() {
    const inputHeaders = ["Name", "EmployeeId", "Phone", "Salary"];
    const headers3 = ["Name", "EmployeeId", "Phone", "Salary"];
    const expectedOutput3 = {
      header: "Email",
      headers: headers3
    };
    deepEqual(
      pushHeaderInHeaders("A", line1, 49, inputHeaders, "Email"),
      expectedOutput3
    );
  });
});
