var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apiv1=require("./apiv1.js");
app.use("/api/v1", apiv1);

app.listen(3000, function () {
  console.log('Run!');
});
