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
  OBJ_FOR_LINE_1,
  OBJ_FOR_LINE_2
} = require("./constants_for_test");

const {
  getTrimmedValue,
  getObject,
  addCharToHeader,
  pushHeader,
  formatDataInArray
} = require("../src/lib");

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

describe("pushHeader", function() {
  it("should add header in headers for true, true, true", function() {
    const actual = pushHeader(true, true, true, HEADERS.slice(), "SALARY");

    let expectedHeaders = HEADERS.slice();
    expectedHeaders.push("SALARY");
    const expectedOutput = {
      header: ES,
      headers: expectedHeaders
    };

    deepEqual(actual, expectedOutput);
  });

  it("should add header in headers for true, true, false", function() {
    const inputHeaders = ["FIRST_NAME", "LAST_NAME", "NUMBER"];
    const actual = pushHeader(true, true, false, inputHeaders, "SALARY");

    const expectedHeaders = ["FIRST_NAME", "LAST_NAME", "NUMBER", "SALARY"];
    const expected = {
      header: ES,
      headers: expectedHeaders
    };

    deepEqual(actual, expected);
  });

  it("should add header in headers for true, false, true", function() {
    const actual = pushHeader(true, false, true, HEADERS.slice(), "SALARY");

    const expectedHeaders = HEADERS.slice();
    expectedHeaders.push("SALARY");
    const expected = {
      header: ES,
      headers: expectedHeaders
    };

    deepEqual(actual, expected);
  });

  it("should not add header in headers for true, false, false", function() {
    const actual = pushHeader(true, false, false, HEADERS, "Salary");

    const expected = {
      header: "Salary",
      headers: HEADERS
    };
    deepEqual(actual, expected);
  });

  it("should not add header in headers for false, false, false", function() {
    const actual = pushHeader(false, false, false, HEADERS, "Salary");

    const expected = {
      header: "Salary",
      headers: HEADERS
    };
    deepEqual(actual, expected);
  });

  it("should add header in headers for false, false, true", function() {
    const actual = pushHeader(false, false, true, HEADERS.slice(), "SALARY");

    let expectedHeaders = HEADERS.slice();
    expectedHeaders.push("SALARY");
    const expected = {
      header: ES,
      headers: expectedHeaders
    };

    deepEqual(actual, expected);
  });

  it("should not add header in headers for false, true, false", function() {
    const actual = pushHeader(false, true, false, HEADERS, "Salary");

    const expected = {
      header: "Salary",
      headers: HEADERS
    };
    deepEqual(actual, expected);
  });

  it("should add header in headers for false, true, true", function() {
    const actual = pushHeader(false, true, true, HEADERS.slice(), "SALARY");

    let expectedHeaders = HEADERS.slice();
    expectedHeaders.push("SALARY");
    const expected = {
      header: "",
      headers: expectedHeaders
    };
    deepEqual(actual, expected);
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
