var userDB = require('../../db/auth');
var apiResponse = require('../../utils/apiResponses');
var common = require('../../utils/common');

exports.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    userDB.checkUser(username, password).then((value) => {
        if(value == 0){
            apiResponse.errorResponse(req, res, "User not found");
        }else{
            if(value.password == common.encryptPassword(password)){
                var token = common.generateToken({username: value.username, fullname: value.fullname});
                value.token = token;
                apiResponse.successResponse(req, res, value);
            }else{
                apiResponse.errorResponse(req, res, "Wrong password");
            }
        }
    }).catch((error) => {
        console.log(error);
        apiResponse.errorResponse(req, res, error);
    });
}