const fs = require("fs");

const getStartPoints = function(firstLine) {
  let headers = firstLine.split(" ");
  let count = 0;
  let startPoints = [0];

  for (let index = 0; index < headers.length; index++) {
    let header = headers[index];
    if (header == "") {
      count++;
      if (headers[index + 1] != "") {
        count++;
        startPoints.push(count);
      }
    } else {
      count += header.length;
    }
  }
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
