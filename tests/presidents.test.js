const expect = require('chai').expect;
const fs = require('fs');

const lifetimeParser = require('../operations/lifetimeParser');
const livingYearsObject = require('../operations/presidentsAliveObj');
const findMaxObjValues = require('../operations/maxValuesArr');

let APIresults;
let arrOfLifespans;
let resultObj;
let finalResults;

before((done) => {
  fs.readFile('./presidents.csv', 'utf8', (err, data) => {
    if (err) throw err;
    APIresults = data.split('\n').splice(1);
    arrOfLifespans = APIresults.map(el => lifetimeParser(el));
    arrOfLifespans.forEach(el => resultObj = livingYearsObject(el));
    finalResults = findMaxObjValues(resultObj);
    done();
  });
});

describe('CSV parser function', () => {
  it('should return an array', () => {
    expect(arrOfLifespans).to.be.an('array');
  });

  it('should return an array of numbers', () => {
    expect(arrOfLifespans[0][0]).to.be.a('number');
    expect(arrOfLifespans[0][1]).to.be.a('number');
    expect(arrOfLifespans[0][0]).to.not.be.NaN;
    expect(arrOfLifespans[0][1]).to.not.be.NaN;
  });

  it('should return an array of Years (length of 4)', () => {
    expect(arrOfLifespans[0][0].toString().length).to.equal(4);
    expect(arrOfLifespans[0][1].toString().length).to.equal(4);
  });
});

describe('livingYearsObject function', () => {
  it('should return an object', () => {
    expect(resultObj).to.be.an('object');
  });
  it('should return objects with numbers as values', () => {
    expect(resultObj[1843]).to.be.a('number');
  });
  it('should increment the year by 1 for each counted year', () => {
    expect(resultObj[1876]).to.equal(13);
  });
});

describe('findMaxObjValues function', () => {
  it('should return an array', () => {
    expect(finalResults).to.be.an('array');
  });
  it('should return an array of strings', () => {
    expect(finalResults.every(val => typeof val === 'string')).to.be.true;
  });
});

describe('The ultimate result', () => {
  const expectedAnswer = ['1822', '1823', '1824', '1825', '1826', '1831', '1833',
    '1834', '1835', '1836', '1837', '1838', '1839', '1840', '1841', '1843',
    '1844', '1845'];
  it('should equal the expected answer', () => {
    expect(finalResults).to.eql(expectedAnswer);
  });
});
