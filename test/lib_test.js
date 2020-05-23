const {equal, deepEqual} = require("assert");
const {expect} = require('chai');

const {
    WS,
    ES,
    CR,
    FILE_PATH,
    WRONG_FILE_PATH,
    STRING_DATA,
    DATA_IN_ARRAY,
    SPLITTED_DATA,
    HEADERS_LINE,
    SPLITTED_HEADERS_LINE,
    SPLITTED_DATA_WITHOUT_HEADERS,
    NO_OF_RECORDS_PARAM,
    LINE_1,
    LINE_2,
    START_POINTS,
    HEADERS,
    OBJ_FOR_LINE_1,
    OBJ_FOR_LINE_2,
    fs
} = require("./constants_for_test");

const {
    getStartPoints,
    getHeaders,
    addCharToHeader,
    pushHeader,
    formatDataInArray,
    getRequiredData,
    getObject,
    getTrimmedValue,
    readFile,
    readData,
    getData
} = require("../src/lib");

describe("getStartPoints", function () {
    it("should return an array of all startpoints", function () {
        const actual = getStartPoints(SPLITTED_HEADERS_LINE);
        const expected = START_POINTS;

        deepEqual(actual, expected);
    });
});

describe("getHeaders", function () {
    it("should return an array of all the headers", function () {
        const actual = getHeaders(HEADERS_LINE);
        const expected = HEADERS;

        deepEqual(actual, expected);
    });
});

describe("addCharToHeader", function () {
    it("should add character to header if character is not WS nor CR and return that header", function () {
        equal(addCharToHeader("o", "hell"), "hello");
    });
    it("should not add character to header if character is WS and return that header", function () {
        equal(addCharToHeader(WS, "hell"), "hell");
    });
    it("should not add character to header if character is CR and return that header", function () {
        equal(addCharToHeader(CR, "hell"), "hell");
    });
});

describe("pushHeader", function () {
    it("should add header in headers for true, true, true", function () {
        const actual = pushHeader(true, true, true, HEADERS.slice(), "SALARY");

        let expectedHeaders = HEADERS.slice();
        expectedHeaders.push("SALARY");
        const expectedOutput = {
            header: ES,
            headers: expectedHeaders
        };

        deepEqual(actual, expectedOutput);
    });

    it("should add header in headers for true, true, false", function () {
        const inputHeaders = ["FIRST_NAME", "LAST_NAME", "NUMBER"];
        const actual = pushHeader(true, true, false, inputHeaders, "SALARY");

        const expectedHeaders = ["FIRST_NAME", "LAST_NAME", "NUMBER", "SALARY"];
        const expected = {
            header: ES,
            headers: expectedHeaders
        };

        deepEqual(actual, expected);
    });

    it("should add header in headers for true, false, true", function () {
        const actual = pushHeader(true, false, true, HEADERS.slice(), "SALARY");

        const expectedHeaders = HEADERS.slice();
        expectedHeaders.push("SALARY");
        const expected = {
            header: ES,
            headers: expectedHeaders
        };

        deepEqual(actual, expected);
    });

    it("should not add header in headers for true, false, false", function () {
        const actual = pushHeader(true, false, false, HEADERS, "Salary");

        const expected = {
            header: "Salary",
            headers: HEADERS
        };

        deepEqual(actual, expected);
    });

    it("should not add header in headers for false, false, false", function () {
        const actual = pushHeader(false, false, false, HEADERS, "Salary");

        const expected = {
            header: "Salary",
            headers: HEADERS
        };

        deepEqual(actual, expected);
    });

    it("should add header in headers for false, false, true", function () {
        const actual = pushHeader(false, false, true, HEADERS.slice(), "SALARY");

        let expectedHeaders = HEADERS.slice();
        expectedHeaders.push("SALARY");
        const expected = {
            header: ES,
            headers: expectedHeaders
        };

        deepEqual(actual, expected);
    });

    it("should not add header in headers for false, true, false", function () {
        const actual = pushHeader(false, true, false, HEADERS, "Salary");

        const expected = {
            header: "Salary",
            headers: HEADERS
        };

        deepEqual(actual, expected);
    });

    it("should add header in headers for false, true, true", function () {
        const actual = pushHeader(false, true, true, HEADERS.slice(), "SALARY");

        let expectedHeaders = HEADERS.slice();
        expectedHeaders.push("SALARY");
        const expected = {
            header: "",
            headers: expectedHeaders
        };

        deepEqual(actual, expected);
    });

    it("should not add header in headers when header is empty string", function () {
        const actual = pushHeader(true, true, true, HEADERS, "");

        const expected = {
            header: "",
            headers: HEADERS
        };

        deepEqual(actual, expected);
    });
});

describe("formatDataInArray", function () {
    it("should return an array of objects for every line and should ignore empty lines", function () {
        const expected = [OBJ_FOR_LINE_1, OBJ_FOR_LINE_2];
        const actual = formatDataInArray(SPLITTED_DATA_WITHOUT_HEADERS, START_POINTS, HEADERS);

        deepEqual(actual, expected);
    });
});

describe("getRequiredData",function(){
    it("should return required number of records if passed in the params", function(){
        const expected = SPLITTED_DATA_WITHOUT_HEADERS.slice(0,1);
        const actual = getRequiredData(NO_OF_RECORDS_PARAM, SPLITTED_DATA);

        deepEqual(actual, expected);
    });

    it("should return all the records if required number of records is not passed", function(){
        const expected = SPLITTED_DATA_WITHOUT_HEADERS;
        const actual = getRequiredData({}, SPLITTED_DATA);

        deepEqual(actual, expected);
    })
});

describe("getObject", function () {
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
        NUMBER: null,
        EMAIL: "kasha.todd@yahoo.com",
        ADDRESS: "910, Vine Street, Campbell, CA - 95008"
    };

    it("should return an object of headers and values given headers and a string of values", function () {
        deepEqual(getObject(LINE_1, HEADERS, START_POINTS), expectedOutputForLine1);
    });

    it("should return an object of headers and values given headers and a string of different values", function () {
        deepEqual(getObject(LINE_2, HEADERS, START_POINTS), expectedOutputForLine2);
    });
});

describe("getTrimmedValue", function () {
    it("should return first value from line after trimming", function () {
        equal(getTrimmedValue(LINE_1, START_POINTS, 0), "Debra");
    });

    it("should return second value from line after trimming", function () {
        equal(getTrimmedValue(LINE_2, START_POINTS, 1), "Todd");
    });

    it("should return third value from line after trimming", function () {
        equal(getTrimmedValue(LINE_1, START_POINTS, 2), "880012XXXX");
    });

    it("should return fourth value from line after trimming", function () {
        equal(getTrimmedValue(LINE_2, START_POINTS, 3), "kasha.todd@yahoo.com");
    });
});

describe("getData", function () {
    it("should throw an error if no valid argument is passed", function() {
        expect(() => getData({})).to.throw();
    });

    it("should take data as string if filepath is not given", function () {
        const actual = getData({data: STRING_DATA});
        const expected = DATA_IN_ARRAY;

        deepEqual(actual, expected);
    });
});

describe("readData", function () {
    it("should return data in Array if data is a string", function () {
        const actual = readData(STRING_DATA);
        const expected = DATA_IN_ARRAY;

        deepEqual(actual, expected);
    });

    it("should throw an error if data is not a string", function () {
        expect(() => readData(["someValues"])).to.throw();
    });

    it("should throw an error if data is an empty string", function () {
        expect(() => readData(ES)).to.throw();
    });
});

describe("readFile", function () {
    it("should return data in Array if file exists", function () {
        const actual = readFile(FILE_PATH, fs);
        const expected = DATA_IN_ARRAY;

        deepEqual(actual, expected);
    });

    it("should throw an error if file does not exists", function () {
        expect(() => getData({filePath: WRONG_FILE_PATH}, fs)).to.throw();
    });
});
