// const fs = require('fs')
// const http = require('http')
// const url = require('url')

// //blocking Synchronous way (bad practice)
// //to read the file
// // const textIn = fs.readFileSync('./starter/txt/input.txt','utf-8')

// // console.log(textIn);

// // const textOut = `This is what we know about the avocado : ${textIn}.\n Created on ${Date.now()}`;

// // //write the file
// // fs.writeFileSync('./starter/txt/output.txt',textOut);
// // console.log("File Written");

// //read and write file asynchronously
// //non blocking ASynchronous way (good practice)

// // fs.readFile('./starter/txt/slart.txt',"utf-8",(err,data) =>{     //here readfile method read data from given path in background
// //     console.log(data);
// // })
// // console.log("will read file");


// //nested non blocking ASynchronous way

// // fs.readFile('./starter/txt/slarttt.txt','utf-8',(err,data1)=>{   //this is callback hell problem
// //     if(err) return console.log("error in your code");
// //     console.log(data1);
// //     fs.readFile(`./starter/txt/${data1}.txt`,'utf-8',(err,data2)=>{
// //     console.log(data2);
// //     fs.readFile(`./starter/txt/append.txt`,'utf-8',(err,data3)=>{
// //         console.log(data3);
// //     fs.writeFile('./starter/final.txt',`${data1}\n ${data2} \n ${data3}`,'utf-8',err =>{
// //         console.log("your file are written");
// //     })
// //     })
// // })
// // })


// ///////////////////////////////////////////
// //SERVER

// // const server = http.createServer((req,res) => {
// //     console.log(req);
// //     res.end("hello from the server");
// // });

// // server.listen(8000,'127.0.0.1',() =>{
// //     console.log('Listening to req on port 8000');
// // });

// //class 9. routing in nodejs
// ///Server

// // const server = http.createServer((req,res)=>{
// //      console.log(req.url);  //use to see req url on console
// //      const pathName = req.url;
// //      if(pathName === '/' || pathName === '/overview'){
// //         res.end("this is the overview")
// //      }
// //      else if(pathName === '/product'){
// //         res.end("this is the product")
// //      }
// //      else{
// //      res.writeHead(404, {  //this are headers
// //         "content-type" : 'text/html',  //this ensure that response is sent in html form
// //         'my-own-header': 'hello world'  //our own header
// //      });
// //      res.end('page not found');
// //      }
// // });

// // server.listen(8000,'127.0.0.1',()=>{
// //     console.log('Listening to request on port 8000');
// // });


// //**class 10. Building a very simple API

// // const server = http.createServer((req,res)=>{
// //       console.log(req.url);
// //       const pathName = req.url;
// //       if(pathName === '/'){
// //         res.end("you are on home page");
// //       }
// //       else if(pathName === '/api'){
// //         fs.readFile('./final/dev-data/data.json','utf-8',(err,data)=>{
// //             res.writeHead(200, {'Content-type' : 'application/json'});
// //             const productData = JSON.parse(data);
// //             // console.log(productData);
// //             res.end(data);
// //         })
// //       }
// //       else{
// //         res.writeHead(404, {
// //             'content-type' : 'text/html',
// //             'our-own-header' : 'hello world'
// //         })
// //         res.end("page not found")
// //       }  
// // })

// // server.listen(8000,'127.0.0.1',()=>{  //'127.0.0.1' -> this is optional
// //     console.log("server started at port 8000");
// // })



// //class 12  // farm project Creation -> replace the placeholder with api data

//    const tempOverview = fs.readFileSync(`${__dirname}/final/template/template-overview.html`,'utf-8');  //read file synchronously
//    const tempCard = fs.readFileSync(`${__dirname}/final/template/template-card.html`,'utf-8');
//    const tempProduct = fs.readFileSync(`${__dirname}/final/template/template-product.html`,'utf-8');   

//    const data = fs.readFileSync('./final/dev-data/data.json','utf-8');
//    const dataObj = JSON.parse(data);  

//    const replaceTemplate = (temp, product) =>{   //in this func we replace the placeholder with api data  temp -> string coming from temoCard  product ->api in json form
//        let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//        output = output.replace(/{%PRODUCTDESCRIPTION%}/g, product.description);
//        output = output.replace(/{%PRICE%}/g, product.price);
//        output = output.replace(/{%QUANTITY%}/g, product.quantity);
//        output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//        output = output.replace(/{%FROM%}/g, product.from);
//        output = output.replace(/{%IMAGE%}/g, product.image);
//        output = output.replace(/{%ID%}/g, product.id);

//         if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');  //The g (global) flag tells JavaScript to: Replace all occurrences of the pattern in the string, not just the first one.
//       return output;
//    }


const server = http.createServer((req,res)=>{
      // console.log(req.url);
      // const pathName = req.url;
         const {pathName, query} = url.parse(req.url,true)
        //  console.log(val);
      if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'content-type' : 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');  //join(' ') is use to 
        // console.log(cardsHtml);
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardsHtml);  //   /string/
        res.end(output);
      }
      else if(pathName === '/product'){
        console.log(query);
        res.end("this is product");
      }
      else if(pathName === '/api'){
        res.writeHead(200, {'content-type' : 'text/html'});
        res.end(data);
      }
      else{
        res.writeHead(404, {
            'content-type' : 'text/html',
            'our-own-header' : 'hello world'
        })
        res.end("page not found")
      }
     
})

server.listen(8000,'127.0.0.1',()=>{  //'127.0.0.1' -> this is optional
    console.log("server started at port 8000");
})


