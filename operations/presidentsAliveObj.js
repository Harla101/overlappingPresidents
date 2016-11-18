function livingYearsClosure() {
  const result = {};
  return function (yearRange) {
    for (let i = yearRange[0]; i <= yearRange[1]; i += 1) {
      result[i] ? result[i] += 1 : result[i] = 1
    }
    return result;
  };
}

const livingYearsObject = livingYearsClosure();

module.exports = livingYearsObject;
