var mongoose = require('mongoose')
var schema = mongoose.Schema;

var db = mongoose.connect("mongodb://localhost/2017_AppJam", function (err) {
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
    weather : {
        type : String
    },
    memo : {
        type : String
    }
});

var one = mongoose.model('one', DataSchema);
var two = mongoose.model('two', DataSchema);
var three = mongoose.model('three', DataSchema);

exports.db = db;
exports.one = one;
exports.two = two;
exports.three = three;