const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./Modules/replaceTemplate')
const slugify = require('slugify')

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
// //             res.writeHead(200, {'Content-type' : 'application/json'});  //pass the header this is just like metadata of html which store the additional info
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

   const tempOverview = fs.readFileSync(`${__dirname}/final/template/template-overview.html`,'utf-8');  //read file synchronously
   const tempCard = fs.readFileSync(`${__dirname}/final/template/template-card.html`,'utf-8');
   const tempProduct = fs.readFileSync(`${__dirname}/final/template/template-product.html`,'utf-8');   

   const data = fs.readFileSync('./final/dev-data/data.json','utf-8');
   const dataObj = JSON.parse(data);  


   
  //  console.log(slugify('Fresh Avacados', {lower : true}));

  const slug = dataObj.map(el => slugify(el.productName, {lower : true}));
  console.log(slug);


const server = http.createServer((req,res)=>{
      // console.log(req.url);
      // const pathName = req.url;
      // console.log(url.parse(req.url,true));

         const {pathname, query} = url.parse(req.url,true)     //url.parse(urlString, parseQueryString)  urlString: The URL string you want to parse (like req.url).  parseQueryString:  false → query string stays as a string.  true → query string gets converted into a JavaScript object.

      if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'content-type' : 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');  //join(' ') is use to arrange in string in ' ' this gap
        // console.log(cardsHtml);
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardsHtml);  //   /string/
        res.end(output);
      }
      else if(pathname === '/product'){
        // console.log(query);
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
       res.end(output);
      }
      else if(pathname === '/api'){
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


//class 14 : wrap up function in modules

//s1 -> take the replaceTemplate function from index.js
//s2 -> create module folder and create replaceTemplate.js in this 
//s2 -> export using module.exports = function


//class 15

//some about NPM
//NPM stands for Node Package Manager.
//It is:
//A tool that comes with Node.js.
//A repository (website) for sharing open-source JavaScript packages (called modules or libraries).
//A command-line interface (CLI) to download, install, manage, and publish packages.

//comm node init -> to create the package.json file

//calss 16 ->

// install two package
//1. slugify ->
// The slugify package is used to convert strings into URL-friendly slugs.
// It:
// Removes special characters.
// Replaces spaces with hyphens (-).
// Converts text to lowercase (usually).
// Makes text safe to use in URLs.

//2. nodemon -> automate update the server only one time right comm "npm start"


//class 17


//http://127.0.0.1:8000/product?id=goat-and-beer   "goat-and-beer" is slug

//class 18

//all about package versioning and updating

//MAJOR.MINOR.PATCH => 4.17.21
// MAJOR	Breaking changes (not backward compatible)
// MINOR	New features (backward compatible)
// PATCH	Bug fixes (backward compatible)


// "express": "^4.17.1"  // Updates allowed till 4.x.x (Not 5.x.x)
// "express": "~4.17.1"  // Updates allowed till 4.17.x (Not 4.18.x)
// "express": "4.17.1"   // Only this version allowed

// Check outdated packages	       npm outdated
// Update safe (minor/patch)	     npm update
// Update to latest version	       npm install <pkg>@latest
// Check current versions          npm list --depth=0
// Remove a package	               npm uninstall <pkg>



//class 19 -> setting up prettier code formatter in vs code


// section 2 -> 

// | Feature                 | Static Website                                     | Dynamic Website                                       |
// |-------------------------|----------------------------------------------------|--------------------------------------------------------|
// | Definition              | Displays fixed content; same for all users.        | Displays dynamic content that can change per user.     |
// | Content Source          | Content is hardcoded in HTML, CSS, JS files.       | Content is fetched from a database or API.             |
// | Technologies Used       | HTML, CSS, JavaScript (client-side only).          | Server-side languages like PHP, Python, Node.js, etc., with databases like MySQL, MongoDB. |
// | Content Update          | Requires manual update of HTML files.              | Can be updated via CMS (e.g., WordPress) or admin panel. |
// | Speed                   | Faster to load (no server processing needed).      | Slower than static (requires server processing).        |
// | Hosting Cost            | Usually cheaper (simple file hosting).             | More expensive (requires server and database).          |
// | Examples                | Personal portfolios, landing pages, simple blogs.  | E-commerce sites, social media platforms, news portals. |
// | User Interaction        | Limited; forms and user-specific content are rare. | High interactivity, user logins, shopping carts, etc.   |
