var db = require('./../helpers/db_helpers')
var helper =  require('./../helpers/helpers')
// var multiparty = require(multiparty)
var imageSavePath = "./public/img/"



module.exports.controller = (app, io, socket_list ) => {

    const msg_success = "successfully";
    const msg_fail = "fail";
    const msg_invalidUser = "invalid username and password";

    app.post('/api/login', (req, res) => {
        helper.Dlog(req.body);
        var reqObj =  req.body;

        helper.CheckParameterValid(res, reqObj, ["email", "password"], () => {

            db.query('SELECT `user_id`, `email`, `created_date`, `update_date`, `status` FROM `user_detail` WHERE `email` = ? AND  `password` = ? AND `status` = "1" ', [ reqObj.email, reqObj.password ] , (err, result) => {

                if(err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                if(result.length > 0) {
                    res.json({ "status": "1", "payload": result[0] , "message": msg_success })
                }else{
                    res.json({ "status": "0", "message": msg_invalidUser })
                }
            })
        } )
    } )
}