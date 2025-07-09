
const fs = require('fs');
const { resolve } = require('path');
const superagent = require("superagent");
const { reject } = require('superagent/lib/request-base');
//popular Node.js HTTP request library used to make requests to APIs and servers
// sending HTTP requests like: GET, POST, PUT, DELETE, PATCH

//  Common Uses of Superagent:
// Fetching data from APIs (like your dog API example).
// Sending data to a server (POST requests).
// Handling query strings, headers, and authentication easily.
// Downloading files or images from the internet.
// Testing HTTP endpoints in Node.js apps.


//this is occur Callback hell-> becoz nested callback operation is occur

// fs.readFile(`${__dirname}/final/dog.txt`,'utf-8',(err,data)=>{
//    console.log(`Breed : ${data}`);

//    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err,res)=>{

//     if(err) return console.log(err.message);

//      console.log(res.body.message);

//      fs.writeFile(`${__dirname}/final/dog-img.txt`,res.body.message, err=>{

//       if(err) return console.log(err.message);
        
//       console.log("random dog image is sent to file");
//      })
//    })
// })


//avoid upper issue using Promises by  the applying promises on superagent

// fs.readFile(`${__dirname}/final/dog.txt`,'utf-8',(err,data)=>{
//    console.log(`Breed : ${data}`);

//    // superagent returns a promise here (you’re using .then)
//    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then((res)=>{  //here we turned this into promise by use then and catch

//      console.log(res.body.message);

//      fs.writeFile(`${__dirname}/final/dog-img.txt`,res.body.message, err=>{

//       console.log("random dog image is sent to file");
//      })
//    })
//    .catch(err=>{
//       console.log(err.message);
//    })
// })


//Building Promises

const readFilePro = file =>{
  return new Promise((resolve,reject)=>{
      fs.readFile(file,'utf-8',(err,data)=>{
          if(err) reject('i could not find that file');
          resolve(data);
      })
  })
}

const writefilePro = (file,data)=>{
   return new Promise((resolve,reject  )=>{
       fs.writeFile(file,data,err=>{
           if(err) reject('there is some issue in writing the file')
            resolve('successfully write');
       })
   })
}

// readFilePro(`${__dirname}/final/dog.txt`).then(data =>{
//       console.log(`Breed : ${data}`);

//    // superagent returns a promise here (you’re using .then)
//    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// })
// .then(res=>{

//      console.log(res.body.message);
//      return writefilePro(`${__dirname}/final/dog-img.txt`, res.body.message)

//    })
//    .then(()=>{
//     console.log("random dog image is sent to file");
//    })
//    .catch(err=>{
//       console.log(err.message);
//    })


//Consuming Promises with AsyncAwait

// const getDogPic = async()=>{ //make this function asynchronous 
//   try{ //use try catch so if any error is occur inside try code then it send it to catch function
//   const data = await readFilePro(`${__dirname}/final/dog.txt`); //we use await keyword with the promises
//     console.log(`Breed : ${data}`);
  
//   const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   console.log(res.body.message);
 
//   await writefilePro(`${__dirname}/final/dog-img.txt`, res.body.message)
//   console.log("random dog image is sent to file");
//   }catch(err){
//     console.log(err);

//     throw err
//   }
//   return '2: READY' //remember async func return promise and this is the result value of this promise
// };

// console.log('1: will get dog pic');
// // const x = getDogPic();  
// // console.log(x);         //here we know async funct return promise here the promise is in pending state so this return the pending in o/p
// getDogPic().then(x=>{  //but here we use then method so if the execution is complete then it return x
//   console.log(x);
//   console.log('3:done getting dog pic');
// }).catch(err=>{
//   console.log('ERROR');
  
// })

//below this we call a async function from the annther async function
// (async ()=>{
//    try{
//      console.log('1: will get dog pic');
//      let x = await getDogPic();
//      console.log(x);
//      console.log('3:done getting dog pic');
//    }catch(err){
//       console.log('ERROR');
//    }
// })()

//how to waiting for multiple promises

const getDogPic = async()=>{ 
  try{ 
  const data = await readFilePro(`${__dirname}/final/dog.txt`); 
    console.log(`Breed : ${data}`);
  
  const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

  const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

  const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

  const all = await Promise.all([res1Pro,res2Pro,res3Pro]);
  const imgs = all.map(el => el.body.message);
 console.log(imgs);
 
  await writefilePro(`${__dirname}/final/dog-img.txt`, imgs.join('\n'))
  console.log("random dog image is sent to file");
  }catch(err){
    console.log(err);

    throw err
  }
  return '2: READY' 
};

(async()=>{    //this type of function call is called IIFE (Immediately invoked function expression)
  try{
    let x = await getDogPic();
    console.log(x);
  }
  catch(err){
    console.log('ERROR');
  }
})();