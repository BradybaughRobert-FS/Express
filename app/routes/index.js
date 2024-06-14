const express = require("express");
const {v4: uuidv4} = require("uuid");   // import uuidv4 from 'uuid';
const router = express.Router();

const database = []; // this is our "database"

// localhost:3000/api/
router.get("/", (req, res) => {
  res.status(200).json({
    message: "GET - API",
    data: database, 
    metadata: { hostname: req.hostname, method: req.method },
  });
});

router.get("/:id", (req, res)=>{
  const {id} = req.params;
  const singleId = database.find((singleId)=> singleId.id === id); // find the id in the database
  if (singleId){
    res.status(200).json({
      message: "GET - API by ID",
      data: singleId,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  };
  
});

router.post("/", (req, res) => {
 const { data }= req.body;
 database.push({id: uuidv4(), ...data}); // add the data to the database
 res.status(201).json({
    message:"POST - /api", 
    data: database[database.length - 1], // return the last item in the database
    metadata: {hostname: req.hostname, method: req.method},
});
  
});

router.patch("/:id", (req, res)=>{ // update select data in the database
  const {id} = req.params;
  const {data} = req.body;
  const singleId = database.find((singleId)=> singleId.id === id); // find the id in the database
  if (singleId){
    database.push({id, ...data}); // add the data to the database
    res.status(200).json({
      message: "PATCH - API by ID",
      data: singleId,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  };
  
});



module.exports = router;
