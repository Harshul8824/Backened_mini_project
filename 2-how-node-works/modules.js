// console.log(arguments);

//module.exports
const C = require('./final/test-module-1');

const cal = new C();

console.log(cal.add(1,2));

//exports
// const C2 = require('./final/test-module-2');

const {add,multiply,divide} = require('./final/test-module-2');

console.log(add(1,2));


//caching
require('./final/test-module-3')();
require('./final/test-module-3')();
require('./final/test-module-3')();
require('./final/test-module-3')();


'use strict';
function show() {
  console.log(this);
}
show(); // undefined



