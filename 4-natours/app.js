const express = require('express')
const fs = require('fs');
const { json } = require('stream/consumers');
const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));  //we use the third party middleware
}

app.use(express.json());
//serving static files -> using middleware
app.use(express.static(`${__dirname}/public`)); //write http://127.0.0.1:3000/overview.html on chrome then access the overviw page
//work for static file

// //basic routing in express

// app.get('/', (req,res) =>{ //this get method send to our server on this url 
//    //  res.status(200).send("hello from the server side!");
//      res.status(200).json({message : "hello from the server side!", app : 'Natours'});
// })

// app.post('/', (req,res)=>{
//    //  res.send('you can post to this endpoints');
//      res.status(200).json({message : "this is post message!", app : 'Natours'});
// })

//creating our own api
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`,'utf-8'));

//use middlewware to read req data

//1. add middleeware
//Creating our own middleware
// app.use(express.json());  this middleware we create abouve int express.json is calling json method which return the function which is added in middleware stack



app.use((req,res,next)=>{
   console.log("hello from the middleware");
   next();
})

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime);
    //don't forget to call next function
    next();  //using this we call next middleware in the stack
})


// //2. Route Handlers

// const home = (req,res) =>{ 
//     // res.status(200).send("hello from the server side!");
//      res.status(200 ).json({message : "hello from the server side!", app : 'Natours'});
// }

// //tours route handler

// const getAllTours = (req,res)=>{
//    res.status(200).json({
//      status : 'success',
//      reqAt : req.requestTime,
//      results: tours.length,
//      data: {
//         tours
//      }
//    });
// }

// const createTour = (req,res)=>{
//      //here req contain some data but we directly not fetch data from req using body instaed we use middleware in this 
//      console.log(req.body);

//    const newId = tours[tours.length - 1].id + 1;
//    const newTour = Object.assign({id : newId}, req.body);
  
//    tours.push(newTour);
//    fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours),err=>{
//       res.status(201).json({
//         status : 'success',
//         data : {
//             tour : newTour
//         }
//       });
//    })
//    //   res.send('Done');
// }

// const getTour = (req,res)=>{
//    console.log(req.params); //return the obj which store the value/id of the url
//    const id = req.params.id*1 //mult 1 becoz convert string to number

//       const tour = tours.find(el => el.id === id);

//    // if(id > tours.length){
//    if(!tour){
//       return res.status(404).json({
//          status : "fail",
//          message : "invalid id"
//       })
//    }

//    res.status(200).json({
//      status : 'success',
//      results: tours.length,
//      data: {
//         tour
//      }
//    })
// }

// const updateTour = (req,res)=>{
//    if(req.params.id*1 > tours.length){
//       return res.status(404).json({
//          status : "failed",
//          message : "invalid id"
//       })
//    }

//    res.status(200).json({
//       statue : "success",
//       data : {
//          tour : "<Updated Tour here...>"
//       }
//    })
// }

// const deleteTour = (req,res)=>{
//    if(req.params.id*1 > tours.length){
//       return res.status(404).json({
//          status : "failed",
//          message : "invalid id"
//       })
//    }

//    res.status(204).json({ //204 -> no content
//       statue : "success",
//       data : null
//    })
// }

//user route handler
// const getAllUsers = (req,res)=>{
//    res.status(500).json({   //500 -> server error
//      status : 'failed',
//      message : "this route is not yet defined"
//    });
// }

// const createUser = (req,res)=>{
//    res.status(500).json({   //500 -> server error
//      status : 'failed',
//      message : "this route is not yet defined"
//    });
// }

// const getUser = (req,res)=>{
//    res.status(500).json({   //500 -> server error
//      status : 'failed',
//      message : "this route is not yet defined"
//    });
// }

// const updateUser = (req,res)=>{
//    res.status(500).json({   //500 -> server error
//      status : 'failed',
//      message : "this route is not yet defined"
//    });
// }

// const deleteUser = (req,res)=>{
//    res.status(500).json({   //500 -> server error
//      status : 'failed',
//      message : "this route is not yet defined"
//    });
// }

//3. Routes
// app.get('/', home)
// // //to get all tours
// // app.get('/api/v1/tours',getAllTours)

// // //handling post request

// // app.post('/api/v1/tours', createTour)


// // app.get('/api/v1/tours/:id', getTour)

// // app.patch('/api/v1/tours/:id', updateTour)


// // app.delete('/api/v1/tours/:id', deleteTour)

//create tours route

// app.route('/api/v1/tours')
// .get(getAllTours)
// .post(createTour);

// // app.use((req,res,next)=>{  
// //    console.log("hello from the middleware"); //this not print becoz the req res cycle(getAllTours) is already finished;  //so the order is matters in express
// //    next();
// // })

// app.route('/api/v1/tours/:id')
// .get(getTour)
// .patch(updateTour)
// .delete(deleteTour);

// //create users route

// app.route('/api/v1/users')
// .get(getAllUsers)
// .post(createUser);

// app.route('/api/v1/users/:id')
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser);


//4. activate the server
// const port = 3000;
// app.listen(port, ()=>{
//     console.log(`App runnig on port ${port}...`);
// })


//*Creating and Mounting Multiple Routes   //we move this on file

app.use('/api/v1/tours', tourRouter); //mount router module on path (parent route)
// //so here when the req enter in this middleware then this assign the route '/api/v1/tours' in test router
app.use('/api/v1/users', userRouter);

// const tourRouter = express.Router(); 
// const userRouter = express.Router();

// tourRouter
// .route('/')
// .get(getAllTours)
// .post(createTour);

// tourRouter
// .route('/:id')
// .get(getTour)
// .patch(updateTour)
// .delete(deleteTour);

// userRouter
// .route('/')
// .get(getAllUsers)
// .post(createUser);
 
// userRouter
// .route('/:id')
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser);


module.exports = app;