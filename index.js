/* GAME PLAN:
1) Create array of presidents from CSV file, splitting string into array at \n characters
2) parse out the birth year and death year as array =>  [[birth, death], [birth, death]]
   -if currently alive, death year is equal to current year
3) the birthDeathYears array is then curried into a closure, which ultimately
  returns an object with the number of concurrently living presidents as a value ,
  the year as the key. e.g. {'1900': 2, '1901': 1}
4) then iterate through that object to find the highest value and returns an array
with years that match  the highest value, e.g. ['1836', '1837', '1838' ... ]
*/

const fs = require('fs');
const Rx = require('rxjs/Rx');

const lifetimeParser = require('./operations/lifetimeParser');
const livingYearsObject = require('./operations/presidentsAliveObj');
const findMaxObjValues = require('./operations/maxValuesArr');


// implemented as node callback
fs.readFile('./presidents.csv', 'utf8', (err, data) => {
  let resultObj;
  if (err) throw err;
  const presidentsArr = data.split('\n').splice(1);
  const arrOfLifespans = presidentsArr.map(el => lifetimeParser(el));
  arrOfLifespans.forEach(el => resultObj = livingYearsObject(el));
  console.log(findMaxObjValues(resultObj));
});

// implemented as Observable (works, but not as proper as could be... yet)
/*
const fileSource = Rx.Observable.bindNodeCallback(fs.readFile);
const result = fileSource('./presidents.csv', 'utf8')
              .map(fullData => fullData.split('\n').splice(1))
              .flatMap(x => x)
              .map(prezDetails => lifetimeParser(prezDetails))
              .map(x => livingYearsObject(x))
              .last(x => x)
              .map(x => findMaxObjValues(x));

result.subscribe(
  x => console.log(x),
  e => console.error('error: ', e)
);
*/
