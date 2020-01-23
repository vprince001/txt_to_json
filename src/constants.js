const CR = "\r";
const NL = "\n";
const WS = " ";
const ES = "";
const FORMAT = "utf8";
const STRING = "string";

//messages
const EMPTY_DATA_MSG = "ERROR -->> Provided data is empty.";
const EMPTY_DATA_EXCEPTION = "EmptyDataException";

const NOT_A_STRING_MSG = "ERROR -->> Provided data is not a String.";
const INVALID_DATA_EXCEPTION = "InvalidData";

const NOT_VALID_ARG_MSG = "ERROR -->> No valid argument provided.";
const INVALID_ARGUMENT_EXCEPTION = "InvalidArgumentException";

const FILE_NOT_FOUND_EXCEPTION = "FileNotFoundException";

module.exports = {
    CR,
    NL,
    WS,
    ES,
    FORMAT,
    STRING,
    EMPTY_DATA_MSG,
    EMPTY_DATA_EXCEPTION,
    NOT_A_STRING_MSG,
    INVALID_DATA_EXCEPTION,
    FILE_NOT_FOUND_EXCEPTION,
    NOT_VALID_ARG_MSG,
    INVALID_ARGUMENT_EXCEPTION
};
