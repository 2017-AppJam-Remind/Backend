module.exports = function(app, fs, router, multer, moment, DataSchema, db){

    var threeimage = 0;

    var threestorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'three/')
        },
        filename: function (req, file, cb) {
            cb(null, 'three'+threeimage+'.png')
        }
    })

    var threeupload = multer({ storage : threestorage });

    router.get('/', function (req, res) {
        fs.readFile('index.html', 'utf-8', function (err, data) {
            res.send(data);
        })
    })

    router.post('/', threeupload.single('file'), function (req, res) {
        console.log(req.file)
        var params = {
            name : req.param('name'),
            weather : req.param('weather'),
            memo : req.param('memo')
        };
        console.log(params)
        var time = moment().format('YYYY년 MM월 DD일, h:mm:ss A');
        var data = new db.three({
            name : req.param('name'),
            imageName : 'http://soylatte.kr:3000/three/'+threeimage+'.png',
            time : time,
            weather : req.param('weather'),
            memo : req.param('memo')
        })
        db.three.findOne({
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
                        console.log('three'+threeimage+' Save Success!')
                        threeimage++;
                        res.send(200, [req.file, params]);
                    }
                })
            }
        })
    })

    return router;
}

