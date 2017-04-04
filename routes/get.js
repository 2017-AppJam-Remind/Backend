module.exports =  function (app, router) {

    router.get('/', function (req, res) {

        one.find({ }, function (err, result) {
            if(err){
                console.log('/get find Error!')
                throw err
            }
            else if(result){
                console.log('One Connect')
                res.json(result)
            }
            else {
                console.log('Not Founed Data')
                res.json({
                    success : false,
                    message : "Data Not Found"
                })
            }
        })
    })

    return router;
}