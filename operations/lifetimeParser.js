// returns an array of birth year and death year, array of integers
function birthDeathYearsParse(str) {
  let birthYear;
  let deathYear;
  // keeps track of commas, per CSV (comma separated values) format
  let commaCount = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (str.charAt(i) === ',') {
      commaCount += 1;
      if (commaCount === 2) {
        birthYear = str.substring(i - 4, i);
      }
      if (commaCount === 4) {
        deathYear = str.substring(i - 4, i);
        if (isNaN(deathYear)) deathYear = new Date().getFullYear();
        // break here, no need to iterate through the rest of the element
        break;
      }
    }
  }
  return [parseInt(birthYear, 10), parseInt(deathYear, 10)];
}

module.exports = birthDeathYearsParse;
