const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const schema  = mongoose.Schema;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage : storage })

mongoose.connect("mongodb://localhost/2017_AppJam", function (err) {
    if(err){
        console.log('DB Error!');
        throw err;
    }
    else {
        console.log('DB Connect Success!');
    }
})

const DataSchema = new schema({
    imageName : {
        type : String
    },
    whether : {
        type: String
    },
})

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use('/image', express.static('upload_file'));

app.listen(3000, function (err) {
    if(err){
        console.log('Server Error!');
        throw err;
    }
    else {
        console.log('Server Running At 3000 Port!');
    }
});



