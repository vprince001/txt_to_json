const fs = require("fs");

const getStartPoints = function(firstLine) {
  let headers = firstLine.split(" ");
  let startPoints = [0];

  headers.reduce(function(acc, currentElement, index) {
    if (currentElement == "") {
      acc++;
      if (headers[index + 1] != "") {
        acc++;
        startPoints.push(acc);
      }
    } else {
      acc += currentElement.length;
    }
    return acc;
  }, 0);
  return startPoints;
};

const formatDataInArray = function(data, startPoints) {
  let headers = data[0].split(" ").filter(element => element);
  headers.pop();
  let obj = {};
  let finalResult = [];

  for (let dataIndex = 1; dataIndex < data.length - 1; dataIndex++) {
    for (let headerIndex = 0; headerIndex < headers.length; headerIndex++) {
      obj[headers[headerIndex]] = data[dataIndex]
        .substring(startPoints[headerIndex], startPoints[headerIndex + 1])
        .trim();
    }
    finalResult.push(obj);
  }
  return finalResult;
};

const main = function() {
  const data = fs.readFileSync("./data_file.txt", "utf8").split("\n");
  const startPoints = getStartPoints(data[0]);
  const finalResult = formatDataInArray(data, startPoints);
  fs.writeFileSync("./output.json", JSON.stringify(finalResult));
};

main();
