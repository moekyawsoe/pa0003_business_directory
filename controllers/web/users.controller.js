var UserModel = require('../../models').UsersModel;
var common = require('../../utils/common');
var apiResponse = require('../../utils/apiResponses');

exports.createUser = (req, res) => {
    var body = req.body;
    var data = {
        username: body.username,
        fullname: body.fullname,
        password: common.encryptPassword(body.password),
        email: body.email,
        phone: body.phone,
        status: body.status,
        createdAt: common.now()
    };
    var results = UserModel.create(data);
    results.then((value) => {
        apiResponse.successResponse(req, res, "User Created", "");
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Sorry! ${err}`);
    });
}

exports.UserList = async (req, res) => {
    var Userlist = await UserModel.get_all();
    if(Userlist){
        apiResponse.successResponse(req, res, "User List", common.prettifyArray(Userlist));
    }else{
        apiResponse.errorResponse(req, res, `Error!`);
    }
}

exports.UserDetails = (req, res) => {
    var id = req.params.id;
    UserModel.find(id).then((value) => {
        apiResponse.successResponse(req, res, "Details", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.updateUser = (req, res) => {
    var id = req.params.id;
    var data = req.body;
    UserModel.update(id, data).then((value) => {
        apiResponse.successResponse(req, res, "Updated!", "");
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.deleteUser = (req, res) => {
    var id = req.params.id;
    UserModel.delete(id).then((value) => {
        apiResponse.successResponse(req, res, "Success!", "");
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

