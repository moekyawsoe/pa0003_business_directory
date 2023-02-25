var AdminModel = require('../../models').AdminModel;
var common = require('../../utils/common');
var apiResponse = require('../../utils/apiResponses');

exports.createAdmin = (req, res) => {
    var body = req.body;
    var data = {
        username: body.username,
        fullname: body.fullname,
        password: common.encryptPassword(body.password),
        role: body.role,
        status: body.status,
        createdAt: common.now()
    };
    var results = AdminModel.create(data);
    results.then((value) => {
        apiResponse.successResponse(req, res, "Admin Created", "");
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Sorry! ${err}`);
    });
}

exports.AdminList = async (req, res) => {
    var adminlist = await AdminModel.get_all();
    if(adminlist){
        apiResponse.successResponse(req, res, "Admin List", adminlist);
    }else{
        apiResponse.errorResponse(req, res, `Error!`);
    }

}

exports.AdminDetails = () => {
    
}

exports.updateAdmin = () => {

}

exports.deleteAdmin = () => {

}

