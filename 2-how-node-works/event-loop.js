const fs = require('fs')
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

// setTimeout(() => {console.log("timer 1 finished")}, 0);

// setImmediate( () => console.log("immediate 1 finished"))

// fs.readFile('./final/test-file.txt','utf-8', ()=>{
  
//   console.log("I/O finished");
//   console.log("--------------------------");

// setTimeout(() => {console.log("timer 2 finished")}, 0);

// setTimeout(() => {console.log("timer 3 finished")}, 3000);

// setImmediate( () => console.log("immediate 1 finished"))

// process.nextTick(() => console.log("Process.nextTick"))

// //all four come at the same time becoz 4 thread are present in the thread poool
// //1
// crypto.pbkdf2("password", "salt", 100000, 1024, "sha512",()=>{
//   console.log(Date.now() - start ,"password encrypted");
// });
// //2
// crypto.pbkdf2("password", "salt", 100000, 1024, "sha512",()=>{
//   console.log(Date.now() - start ,"password encrypted");
// });
// //3
// crypto.pbkdf2("password", "salt", 100000, 1024, "sha512",()=>{
//   console.log(Date.now() - start ,"password encrypted");
// });
// //4
// crypto.pbkdf2("password", "salt", 100000, 1024, "sha512",()=>{
//   console.log(Date.now() - start ,"password encrypted");
// });

// });


//check synchronously

fs.readFileSync('./final/test-file.txt','utf-8')
  
  console.log("I/O finished");
  console.log("--------------------------");

setTimeout(() => {console.log("timer 2 finished")}, 0);

setTimeout(() => {console.log("timer 3 finished")}, 3000);

setImmediate( () => console.log("immediate 1 finished"))

process.nextTick(() => console.log("Process.nextTick"))

//all four come at the same time becoz 4 thread are present in the thread poool

//1
crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
console.log(Date.now() - start ,"password encrypted");
//2
crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512",);
console.log(Date.now() - start ,"password encrypted");
//3
crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
console.log(Date.now() - start ,"password encrypted");
//4
crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
console.log(Date.now() - start ,"password encrypted");



