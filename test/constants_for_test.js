const WS = ' ';
const ES = '';
const CR = '\r';
const FILE_PATH = './data.json';
const WRONG_FILE_PATH = './d.txt';

const FIRST_NAME = 'FIRST_NAME';
const LAST_NAME = 'LAST_NAME';
const NUMBER = 'NUMBER';
const EMAIL = 'EMAIL';
const ADDRESS = 'ADDRESS';

const LINE_1_FIRST_NAME = 'Debra';
const LINE_1_LAST_NAME = 'Burks';
const LINE_1_NUMBER = '880012XXXX';
const LINE_1_EMAIL = 'debra.burks@yahoo.com';
const LINE_1_ADDRESS = '9273 Thome Ave., Orchard Park, NY - 14127';

const LINE_2_FIRST_NAME = 'Kasha';
const LINE_2_LAST_NAME = 'Todd';
const LINE_2_NUMBER = null;
const LINE_2_EMAIL = 'kasha.todd@yahoo.com';
const LINE_2_ADDRESS = '910, Vine Street, Campbell, CA - 95008';

const HEADER_ONE = `${FIRST_NAME}     `;
const HEADER_TWO = `${LAST_NAME}        `;
const HEADER_THREE = `${NUMBER}               `;
const HEADER_FOUR = `${EMAIL}                        `;
const HEADER_FIVE = `${ADDRESS}                                  `;
const HEADER_LINE = `${HEADER_ONE}${HEADER_TWO}${HEADER_THREE}${HEADER_FOUR}${HEADER_FIVE}`;

const FIRST_NAME_ONE = `${LINE_1_FIRST_NAME}          `;
const LAST_NAME_ONE = `${LINE_1_LAST_NAME}            `;
const NUMBER_ONE = `${LINE_1_NUMBER}           `;
const EMAIL_ONE = `${LINE_1_EMAIL}        `;
const DATA_LINE_ONE = `${FIRST_NAME_ONE}${LAST_NAME_ONE}${NUMBER_ONE}${EMAIL_ONE}${LINE_1_ADDRESS}`;

const FIRST_NAME_TWO = `${LINE_2_FIRST_NAME}          `;
const LAST_NAME_TWO = `${LINE_2_LAST_NAME}             `;
const NUMBER_TWO = `${LINE_2_NUMBER}                 `;
const EMAIL_TWO = `${LINE_2_EMAIL}         `;
const DATA_LINE_TWO = `${FIRST_NAME_TWO}${LAST_NAME_TWO}${NUMBER_TWO}${EMAIL_TWO}${LINE_2_ADDRESS}`;

const STRING_DATA = `${HEADER_LINE}\n${DATA_LINE_ONE}\n${DATA_LINE_TWO}\n\n`;

const DATA_IN_ARRAY = [HEADER_LINE, DATA_LINE_ONE, DATA_LINE_TWO, ES, ES];

const SPLITTED_DATA = STRING_DATA.split('\n');

const SPLITTED_DATA_WITHOUT_HEADERS = SPLITTED_DATA.slice(1);

const HEADERS_LINE = SPLITTED_DATA[0];

const SPLITTED_HEADERS_LINE = HEADERS_LINE.split(ES);

const LINE_1 = SPLITTED_DATA[1];

const LINE_2 = SPLITTED_DATA[2];

const START_POINTS = [0, 15, 32, 53, 82, 123];

const NO_OF_RECORDS_PARAM = {noOfRecords:1};

const HEADERS = [FIRST_NAME, LAST_NAME, NUMBER, EMAIL, ADDRESS];

const OBJ_FOR_LINE_1 = {
  FIRST_NAME: LINE_1_FIRST_NAME,
  LAST_NAME: LINE_1_LAST_NAME,
  NUMBER: LINE_1_NUMBER,
  EMAIL: LINE_1_EMAIL,
  ADDRESS: LINE_1_ADDRESS
};

const OBJ_FOR_LINE_2 = {
  FIRST_NAME: LINE_2_FIRST_NAME,
  LAST_NAME: LINE_2_LAST_NAME,
  NUMBER: LINE_2_NUMBER,
  EMAIL: LINE_2_EMAIL,
  ADDRESS: LINE_2_ADDRESS
};

const fs = {
  readFileSync: () => STRING_DATA,
  existsSync: filePath => filePath === FILE_PATH
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
