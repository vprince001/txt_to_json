const fs = require("fs");
const { NL, WS, ES, FORMAT } = require("./src/constants");
const {
  addEndPoint,
  getObject,
  addCharToHeader,
  pushHeaderInHeaders
} = require("./src/lib");

const getHeadersAndStartPoints = function(data) {
  const line = data[0].split(ES);
  let startPoints = [0];
  let headers = [];
  let header = ES;

  line.forEach((char, index) => {
    const isSpace = char == WS;
    const nextIsNotSpace = line[index + 1] != WS;

    header = addCharToHeader(char, header);
    if (isSpace && nextIsNotSpace) {
      startPoints.push(index + 1);
      headers.push(header);
      return (header = ES);
    }
    const head = pushHeaderInHeaders(char, line, index, headers, header);
    headers = head.headers;
    header = head.header;
  });
  startPoints.push(addEndPoint(data));
  return { headers, startPoints };
};

const formatDataInArray = function(data, startPoints, headers) {
  let finalResult = [];
  data = data.slice(1);

  data.forEach(line => {
    finalResult.push(getObject(line, headers, startPoints));
  });
  return finalResult;
};

const txtToJson = function(filePath) {
  const data = fs.readFileSync(filePath, FORMAT).split(NL);
  const { headers, startPoints } = getHeadersAndStartPoints(data);
  const finalResult = formatDataInArray(data, startPoints, headers);
  return finalResult;
};

module.exports = txtToJson;
