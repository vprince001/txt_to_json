const { equal, deepEqual } = require("assert");

const {
  WS,
  ES,
  CR,
  SPLITTED_DATA,
  LINE1,
  LINE2,
  START_POINTS,
  HEADERS,
  SPLITTED_HEADERS_LINE,
  OBJ_FOR_LINE_1,
  OBJ_FOR_LINE_2
} = require("./constants_for_test");

const {
  addEndPoint,
  getTrimmedValue,
  getObject,
  addCharToHeader,
  pushHeaderInHeaders,
  formatDataInArray
} = require("../src/lib");

describe("addEndPoint", function() {
  it("should return max length from array of strings", function() {
    equal(addEndPoint(SPLITTED_DATA), 123);
  });
});

describe("getTrimmedValue", function() {
  it("should return first value from line after trimming", function() {
    equal(getTrimmedValue(LINE1, START_POINTS, 0), "Debra");
  });

  it("should return second value from line after trimming", function() {
    equal(getTrimmedValue(LINE2, START_POINTS, 1), "Todd");
  });

  it("should return third value from line after trimming", function() {
    equal(getTrimmedValue(LINE1, START_POINTS, 2), "880012XXXX");
  });

  it("should return fourth value from line after trimming", function() {
    equal(getTrimmedValue(LINE2, START_POINTS, 3), "kasha.todd@yahoo.com");
  });
});

describe("getObject", function() {
  const expectedOutputForLine1 = {
    FIRST_NAME: "Debra",
    LAST_NAME: "Burks",
    NUMBER: "880012XXXX",
    EMAIL: "debra.burks@yahoo.com",
    ADDRESS: "9273 Thome Ave., Orchard Park, NY - 14127"
  };

  const expectedOutputForLine2 = {
    FIRST_NAME: "Kasha",
    LAST_NAME: "Todd",
    NUMBER: "NULL",
    EMAIL: "kasha.todd@yahoo.com",
    ADDRESS: "910, Vine Street, Campbell, CA - 95008"
  };

  it("should return an object of headers and values given headers and a string of values", function() {
    deepEqual(getObject(LINE1, HEADERS, START_POINTS), expectedOutputForLine1);
  });

  it("should return an object of headers and values given headers and a string of different values", function() {
    deepEqual(getObject(LINE2, HEADERS, START_POINTS), expectedOutputForLine2);
  });
});

describe("addCharToHeader", function() {
  it("should add character to header if character is not WS nor CR and return that header", function() {
    equal(addCharToHeader("o", "hell"), "hello");
  });
  it("should not add character to header if character is WS and return that header", function() {
    equal(addCharToHeader(WS, "hell"), "hell");
  });
  it("should not add character to header if character is CR and return that header", function() {
    equal(addCharToHeader(CR, "hell"), "hell");
  });
});

describe("pushHeaderInHeaders", function() {
  it("should add header in headers if character is CR and previous is not WS and return headers and empty header", function() {
    let expectedHeaders = HEADERS.slice();
    expectedHeaders.push("Salary");

    const expectedOutput = {
      header: ES,
      headers: expectedHeaders
    };

    deepEqual(
      pushHeaderInHeaders(
        CR,
        SPLITTED_HEADERS_LINE,
        89,
        HEADERS.slice(),
        "Salary"
      ),
      expectedOutput
    );
  });

  it("should not add header in headers if previous character is WS and return headers and header", function() {
    const expectedOutput = {
      header: "Salary",
      headers: HEADERS
    };
    deepEqual(
      pushHeaderInHeaders(CR, SPLITTED_HEADERS_LINE, 80, HEADERS, "Salary"),
      expectedOutput
    );
  });

  it("should not add header in headers if character is not CR and return headers and header", function() {
    const expectedOutput = {
      header: "Email",
      headers: HEADERS
    };
    deepEqual(
      pushHeaderInHeaders("A", SPLITTED_HEADERS_LINE, 89, HEADERS, "Email"),
      expectedOutput
    );
  });
});

describe("formatDataInArray", function() {
  it("should return an array of objects for every line", function() {
    const expectedOutput = [OBJ_FOR_LINE_1, OBJ_FOR_LINE_2];
    deepEqual(
      formatDataInArray(SPLITTED_DATA, START_POINTS, HEADERS),
      expectedOutput
    );
  });
});
