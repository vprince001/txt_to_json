const WS = " ";
const ES = "";
const CR = "\r";
const FILE_PATH = "./data.json";
const WRONG_FILE_PATH = "./d.txt";

const STRING_DATA =
    `FIRST_NAME     LAST_NAME        NUMBER               EMAIL                        ADDRESS                                  
Debra          Burks            880012XXXX           debra.burks@yahoo.com        9273 Thome Ave., Orchard Park, NY - 14127
Kasha          Todd             null                 kasha.todd@yahoo.com         910, Vine Street, Campbell, CA - 95008
\n`;

const DATA_IN_ARRAY =
    ["FIRST_NAME     LAST_NAME        NUMBER               EMAIL                        ADDRESS                                  ",
        "Debra          Burks            880012XXXX           debra.burks@yahoo.com        9273 Thome Ave., Orchard Park, NY - 14127",
        "Kasha          Todd             null                 kasha.todd@yahoo.com         910, Vine Street, Campbell, CA - 95008",
        "",
        ""
    ];


const SPLITTED_DATA = STRING_DATA.split("\n");

const SPLITTED_DATA_WITHOUT_HEADERS = SPLITTED_DATA.slice(1);

const HEADERS_LINE = SPLITTED_DATA[0];

const SPLITTED_HEADERS_LINE = HEADERS_LINE.split(ES);

const LINE_1 = SPLITTED_DATA[1];

const LINE_2 = SPLITTED_DATA[2];

const START_POINTS = [0, 15, 32, 53, 82, 123];

const NO_OF_RECORDS_PARAM = {noOfRecords:1};

const HEADERS = ["FIRST_NAME", "LAST_NAME", "NUMBER", "EMAIL", "ADDRESS"];

const OBJ_FOR_LINE_1 = {
    FIRST_NAME: "Debra",
    LAST_NAME: "Burks",
    NUMBER: "880012XXXX",
    EMAIL: "debra.burks@yahoo.com",
    ADDRESS: "9273 Thome Ave., Orchard Park, NY - 14127"
};

const OBJ_FOR_LINE_2 = {
    FIRST_NAME: "Kasha",
    LAST_NAME: "Todd",
    NUMBER: null,
    EMAIL: "kasha.todd@yahoo.com",
    ADDRESS: "910, Vine Street, Campbell, CA - 95008"
};

const fs = {
    readFileSync: () => STRING_DATA,
    existsSync: filePath => filePath == FILE_PATH ? true : false
};

module.exports = {
    WS,
    ES,
    CR,
    FILE_PATH,
    WRONG_FILE_PATH,
    STRING_DATA,
    DATA_IN_ARRAY,
    SPLITTED_DATA,
    SPLITTED_DATA_WITHOUT_HEADERS,
    HEADERS_LINE,
    NO_OF_RECORDS_PARAM,
    SPLITTED_HEADERS_LINE,
    LINE_1,
    LINE_2,
    START_POINTS,
    HEADERS,
    OBJ_FOR_LINE_1,
    OBJ_FOR_LINE_2,
    fs
};
