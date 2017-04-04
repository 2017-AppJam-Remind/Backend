var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var moment = require('moment');
var object = moment();
//var get = require('./routes/get')(app, router, one);
var db = require('./mongo/mongo')
var onero = require('./routes/one')(app, fs, router, multer, moment, onero, db);
var tworo = require('./routes/two')(app, fs, router, multer, moment,  tworo, db);
var threero = require('./routes/three')(app, fs, router, multer, moment, threero, db);

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use('/one', onero)
app.use('/two', tworo)
app.use('/three', threero)
//app.use('/get', get)
app.use('/one', express.static('one'));
app.use('/two', express.static('two'));
app.use('/three', express.static('three'));

app.listen(3000, function (err) {
    if(err){
        console.log('Server Error!');
        throw err;
    }
    else {
        console.log('Server Running At 3000 Port!');
    }
});

app.get('/', function (req, res) {
    fs.readFile('select.html', 'utf-8', function (err, data) {
        res.send(data)
    })
})

