const express = require('express')
const fs = require('fs');
const { json } = require('stream/consumers');

const app = express(); 

// //basic routing in express

// app.get('/', (req,res) =>{ //this get method send to our server on this url 
//    //  res.status(200).send("hello from the server side!");
//      res.status(200).json({message : "hello from the server side!", app : 'Natours'});
// })

// app.post('/', (req,res)=>{
//    //  res.send('you can post to this endpoints');
//      res.status(200).json({message : "this is post message!", app : 'Natours'});
// })

const port = 3000;

app.listen(port, ()=>{
    console.log(`App runnig on port ${port}...`);
})


//creating our own api


app.get('/', (req,res) =>{ 
    // res.status(200).send("hello from the server side!");
     res.status(200 ).json({message : "hello from the server side!", app : 'Natours'});
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`,'utf-8'));

//use middlewware to read req data

app.use(express.json());

const getAllTours = (req,res)=>{
   res.status(200).json({
     status : 'success',
     results: tours.length,
     data: {
        tours
     }
   });
}

const createTour = (req,res)=>{
     //here req contain some data but we directly not fetch data from req using body instaed we use middleware in this 
     console.log(req.body);

   const newId = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({id : newId}, req.body);
  
   tours.push(newTour);
   fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours),err=>{
      res.status(201).json({
        status : 'success',
        data : {
            tour : newTour
        }
      });
   })
   //   res.send('Done');
}

const getTour = (req,res)=>{
   console.log(req.params); //return the obj which store the value/id of the url
   const id = req.params.id*1 //mult 1 becoz convert string to number

      const tour = tours.find(el => el.id === id);

   // if(id > tours.length){
   if(!tour){
      return res.status(404).json({
         status : "fail",
         message : "invalid id"
      })
   }

   res.status(200).json({
     status : 'success',
     results: tours.length,
     data: {
        tour
     }
   })
}

const updateTour = (req,res)=>{
   if(req.params.id*1 > tours.length){
      return res.status(404).json({
         status : "failed",
         message : "invalid id"
      })
   }

   res.status(200).json({
      statue : "success",
      data : {
         tour : "<Updated Tour here...>"
      }
   })
}

const deleteTour = (req,res)=>{
   if(req.params.id*1 > tours.length){
      return res.status(404).json({
         status : "failed",
         message : "invalid id"
      })
   }

   res.status(204).json({ //204 -> no content
      statue : "success",
      data : null
   })
}

// //to get all tours
// app.get('/api/v1/tours',getAllTours)

// //handling post request

// app.post('/api/v1/tours', createTour)


// app.get('/api/v1/tours/:id', getTour)

// app.patch('/api/v1/tours/:id', updateTour)


// app.delete('/api/v1/tours/:id', deleteTour)


//another method

app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);


