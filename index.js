 const express = require('express');
 const app = express();
 const { Pool } = require('pg')

 let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(allowCrossDomain);


//routes
app.use(require('./src/routes/index'));

 app.get('/', (req , res ) => {
     res.send("Pagina del backend MI CIUDAD")
 })

 

 app.listen(5000,() => {
     console.log("SERVER ON PORT = 5000")
 })