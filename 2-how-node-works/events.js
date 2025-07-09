const http = require('http')

const EventEmitter = require("events"); //EventEmitter => class

// const myEmitter = new EventEmitter(); //myEmitter => instance of class

class Sales extends EventEmitter{  // Sales is child class, EventEmitter is parent class
    constructor(){
        super(); // Calls the constructor of the parent class (EventEmitter)
    }
}
const myEmitter = new Sales();

myEmitter.on("newSale",()=>{
    console.log("there was a new sale");
});
//apply on event listener on the object

myEmitter.on("newSale",()=>{
    console.log("customer name : Jonas");
})

myEmitter.on("newSale", stock=>{
    console.log(`there are ${stock} items left in stock`);
})

myEmitter.emit("newSale",9); //here emit is just like click the butt
//here newSale -> event

const server = http.createServer();

server.on("request", (req,res)=>{
    console.log("Req recieved");
    res.end("Req Recieved");
    console.log(req.url);
});

server.on("request", (req,res)=>{
    console.log("Another req recieved");
});
server.on("close",()=>{
    console.log("server closed");
})

server.listen(8000, "127.0.0.1", ()=>{
    console.log("waiting for req .....");
})

//note -> server is emitting the req event twice becoz -> one for the root url and another for favicon.ico