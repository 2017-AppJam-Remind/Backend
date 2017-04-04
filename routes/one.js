module.exports = function(app, fs, router, multer, moment, DataSchema, db){

    var oneimage = 0;

    var onestorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'one/')
        },
        filename: function (req, file, cb) {
            cb(null, 'one'+oneimage+'.png')
        }
    })
    var oneupload = multer({ storage : onestorage })

    router.get('/', function (req, res) {
        fs.readFile('index.html', 'utf-8', function (err, data) {
            res.send(data);
        })
    })

    router.post('/', oneupload.single('file'), function (req, res) {
        console.log(req.file)
        var params = {
            name : req.param('name'),
            weather : req.param('weather'),
            memo : req.param('memo')
        };
        console.log(params)
        var time = moment().format('YYYY년 MM월 DD일, h:mm:ss A');
        var data = new db.one({
            name : req.param('name'),
            imageName : 'http://soylatte.kr:3000/one/one'+oneimage+'.png',
            time : time,
            weather : req.param('weather'),
            memo : req.param('memo')
        })
        db.one.findOne({
            imageName : req.file.originalname
        }, function (err, result) {
            if(err){
                console.log('/ findOne Error!')
                throw err
            }
            else if(result){
                console.log('Already in Database')
                res.send(400, {
                    success : false,
                    message : "Already in Database"
                })
            }
            else {
                data.save(function (err) {
                    if(err){
                        console.log('save Error!')
                        res.send(401, {
                            success : false,
                            message : "Save Error!"
                        })
                    }
                    else {
                        console.log('one'+oneimage+' Save Success!')
                        oneimage++;
                        res.send(200, [req.file, params]);
                    }
                })
            }
        })
    })

    return router;
}


