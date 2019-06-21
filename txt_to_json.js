const fs = require("fs");
const file = process.argv[2];

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
  let finalResult = [];
  data = data.slice(1);

  data.forEach(line => {
    let obj = headers.reduce(function(acc, currentElement, index) {
      acc[currentElement] = line
        .substring(startPoints[index], startPoints[index + 1])
        .trim();
      return acc;
    }, {});
    finalResult.push(obj);
  });
  return finalResult;
};

const main = function() {
  const data = fs.readFileSync(file, "utf8").split("\n");
  const startPoints = getStartPoints(data[0]);
  const finalResult = formatDataInArray(data, startPoints);
  fs.writeFileSync("./output.json", JSON.stringify(finalResult));
};

main();
