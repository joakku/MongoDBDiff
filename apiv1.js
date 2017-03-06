var express = require('express');
var router = express.Router();
var mongoTools=require("./mongoTools.js");

router.get('/', function(req, res) {
  res.send('Nothing to do here');
});

router.get('/time',function(req,res){
  res.send(Date.now().toString());
})

router.post("/setConnection",function(req,res){
  mongoTools.setConnection(req.body,function(err){
    err ? res.send({"message":"Check your params :'C","success":false}) : res.send({"message":"Done!","success":true});
  });
})

router.get("/getDBNames",function(req,res){
  mongoTools.getDBNames(res);
})

router.get("/getCommonCollections/:origin/:destination",function(req,res){
  mongoTools.getCommonCollections(req.params,function(err,col){
    if(err) res.send({message:"Something went wrong :'C"});
    res.send(col);
  })
})

module.exports = router;
