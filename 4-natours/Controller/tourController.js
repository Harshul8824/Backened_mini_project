const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`,'utf-8'));

exports.CheckId = (req,res,next,val)=>{
   console.log(`Tour id is ${val}`);
     if(req.params.id*1 > tours.length){
      return res.status(404).json({  //return is imp
         status : "failed",
         message : "invalid id"
      })
   }

   next();
}
exports.checkBody = (req,res,next)=>{
   if(!req.body.name || !req.body.price){
    return res.status(400).json({
       status : "failed",
       message : "Missing name or Price"
     })
   }

   next();
}



//2. Route Handlers
exports.home = (req,res) =>{ 
    // res.status(200).send("hello from the server side!");
     res.status(200 ).json({message : "hello from the server side!", app : 'Natours'});
}

//tours route handler

 exports.getAllTours = (req,res)=>{
   res.status(200).json({
     status : 'success',
     reqAt : req.requestTime,
     results: tours.length,
     data: {
        tours
     }
   });
}

 exports.createTour = (req,res)=>{
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

 exports.getTour = (req,res)=>{
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

exports.updateTour = (req,res)=>{
   // if(req.params.id*1 > tours.length){
   //    return res.status(404).json({
   //       status : "failed",
   //       message : "invalid id"
   //    })
   // }

   res.status(200).json({
      status : "success",
      data : {
         tour : "<Updated Tour here...>"
      }
   })
}

exports.deleteTour = (req,res)=>{
   // if(req.params.id*1 > tours.length){
   //    return res.status(404).json({
   //       status : "failed",
   //       message : "invalid id"
   //    })
   // }

   res.status(204).json({ //204 -> no content
      statue : "success",
      data : null
   })
}