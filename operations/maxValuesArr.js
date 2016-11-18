function findMaxObjValues(obj) {
  let resultArr;
  let highestVal;
  for (let key in obj) {
    if (obj[key] > highestVal) {
      highestVal = obj[key];
      resultArr = [key];
    } else if (obj[key] === highestVal) {
      resultArr.push(key);
    } else if (!highestVal) {
      highestVal = obj[key];
      resultArr = [key];
    }
  }
  return resultArr;
}

module.exports = findMaxObjValues
