const fs = require("fs");
const { NL, WS, ES, FORMAT } = require("./src/constants");
const {
  addEndPoint,
  addCharToHeader,
  pushHeaderInHeaders,
  formatDataInArray
} = require("./src/lib");

const getHeadersAndStartPoints = function(data) {
  const splittedHeaderLine = data[0].split(ES);
  let startPoints = [0];
  let headers = [];
  let header = ES;

  splittedHeaderLine.forEach((char, index) => {
    const isSpace = char == WS;
    const nextIsNotSpace = splittedHeaderLine[index + 1] != WS;

    header = addCharToHeader(char, header);
    if (isSpace && nextIsNotSpace) {
      startPoints.push(index + 1);
      headers.push(header);
      return (header = ES);
    }
    const head = pushHeaderInHeaders(
      char,
      splittedHeaderLine,
      index,
      headers,
      header
    );
    headers = head.headers;
    header = head.header;
  });
  startPoints.push(addEndPoint(data));
  return { headers, startPoints };
};

const main = function(filePath) {
  const data = fs.readFileSync(filePath, FORMAT).split(NL);
  const { headers, startPoints } = getHeadersAndStartPoints(data);
  const finalResult = formatDataInArray(data, startPoints, headers);
  return finalResult;
};

module.exports = main;
