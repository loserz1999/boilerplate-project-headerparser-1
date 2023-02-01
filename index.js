// index.js
// where your node app starts

// init project
require('dotenv').config();
const requestIp = require('request-ip');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use("/public", express.static(__dirname + "/public/style.css"))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

const ipMiddleware = function (req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  next();
};

app.use(requestIp.mw())

app.get("/api/whoami/", (req, res) => {
  res.json({
    ipaddress: req.clientIp,
    language: req.acceptsLanguages(),
    software: req.get('User-Agent')
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
