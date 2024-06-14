const express = require("express");
const router = express.Router();

// localhost:3000/api/
router.get("/", (req, res) => {
  res.status(200).json({
    message: "GET TO API",
    metadata: { hostname: req.hostname, method: req.method },
  });
});

router.get("/:id", (req, res)=>{
  const {id} = req.params.id;
  res.status(200).json({
    message: "GET - SUCCESS",
    id: id,
    metadata: {
       hostname: req.hostname,
       method: req.method,
    },
  });
});

router.post("/", (req, res) => {
 const { data }= req.body;
 res.status(200).json({
    message:"POST to /api", 
    data,
    metadata: {hostname: req.hostname, method: req.method},
});
  res.status(200).json({
    message: "POST TO API",
    data: req.body
  });
});


module.exports = router;
