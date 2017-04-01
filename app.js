const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const schema  = mongoose.Schema;
const multer = require('multer');
const moment = require('moment');
const object = moment();
var oneimage = 0,twoimage = 0,threeimage = 0;
const onestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'one/')
    },
    filename: function (req, file, cb) {
        cb(null, 'one'+(oneimage+1)+'.png')
        oneimage++;
    }
})

const twostorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'two/')
    },
    filename: function (req, file, cb) {
        cb(null, 'two'+(twoimage+1)+'.png')
        twoimage++;
    }
})

const threestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'three/')
    },
    filename: function (req, file, cb) {
        cb(null, 'three'+(threeimage+1)+'.png')
        threeimage++;
    }
})

var oneupload = multer({ storage : onestorage })
var twoupload = multer({ storage : twostorage });
var threeupload = multer({ storage : threestorage });

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use('/one', express.static('one'));
app.use('/two', express.static('two'));
app.use('/three', express.static('three'));

mongoose.connect("mongodb://localhost:28001/2017_AppJam", function (err) {
    if(err){
        console.log('DB Error!');
        throw err;
    }
    else {
        console.log('DB Connect Success!');
    }
})

var DataSchema = new schema({
    name : {
        type : String
    },
    imageName : {
        type : String
    },
    time : {
        type : String
    },
    whether : {
        type: String
    },
    memo : {
        type : String
    }
});

var one = mongoose.model('one', DataSchema);
var two = mongoose.model('two', DataSchema);
var three = mongoose.model('three', DataSchema);

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

app.get('/one', function (req, res) {
    fs.readFile('index.html', 'utf-8', function (err, data) {
        res.send(data);
    })
})

app.get('/two', function (req, res) {
    fs.readFile('index.html', 'utf-8', function (err, data) {
        res.send(data);
    })
})

app.get('/three', function (req, res) {
    fs.readFile('index.html', 'utf-8', function (err, data) {
        res.send(data);
    })
})

app.post('/one', oneupload.single('file'), function (req, res) {
    var body = req.body;
    var time = moment().format('YYYY년 MM월 DD일, h:mm:ss A');
    var data = new one({
        name : body.name,
        imageName : 'one'+oneimage,
        time : time,
        whether : body.whether,
        memo : body.memo
    })
    one.findOne({
        imageName : req.file.originalname
    }, function (err, result) {
        if(err){
            console.log('/ findOne Error!')
            throw err
        }
        else if(result){
            console.log('Already in Database')
            res.json({
                success : false,
                message : "Already in Database"
            })
        }
        else {
            data.save(function (err) {
                if(err){
                    console.log('save Error!')
                    res.json({
                        success : false,
                        message : "Save Error!"
                    })
                }
                else {
                    console.log('one'+oneimage+' Save Success!')
                    res.json({
                        success : true,
                        message : "Save Success"
                    })
                }
            })
        }
    })
})

app.post('/two', twoupload.single('file'), function (req, res) {
    var body = req.body;
    var time = moment().format('YYYY년 MM월 DD일, h:mm:ss A');
    var data = new two({
        name : body.name,
        imageName : 'two'+twoimage,
        time : time,
        whether : body.whether,
        memo : body.memo
    })
    two.findOne({
        imageName : req.file.originalname
    }, function (err, result) {
        if(err){
            console.log('/ findOne Error!')
            throw err
        }
        else if(result){
            console.log('Already in Database')
            res.json({
                success : false,
                message : "Already in Database"
            })
        }
        else {
            data.save(function (err) {
                if(err){
                    console.log('save Error!')
                    res.json({
                        success : false,
                        message : "Save Error!"
                    })
                }
                else {
                    console.log('two'+twoimage+' Save Success!')
                    res.json({
                        success : true,
                        message : "Save Success"
                    })
                }
            })
        }
    })
})

app.post('/three', threeupload.single('file'), function (req, res) {
    const body = req.body;
    const time = moment().format('YYYY년 MM월 DD일, h:mm:ss A');
    var data = new three({
        name : body.name,
        imageName : 'three'+threeimage,
        time : time,
        whether : body.whether,
        memo : body.memo
    })
    three.findOne({
        imageName : req.file.originalname
    }, function (err, result) {
        if(err){
            console.log('/ findOne Error!')
            throw err
        }
        else if(result){
            console.log('Already in Database')
            res.json({
                success : false,
                message : "Already in Database"
            })
        }
        else {
            data.save(function (err) {
                if(err){
                    console.log('save Error!')
                    res.json({
                        success : false,
                        message : "Save Error!"
                    })
                }
                else {
                    console.log('three'+threeimage+' Save Success!')
                    res.json({
                        success : true,
                        message : "Save Success"
                    })
                }
            })
        }
    })
})




