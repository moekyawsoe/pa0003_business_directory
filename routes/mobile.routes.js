var userController = require('../controllers/web/users.controller');
var authController = require('../controllers/mobile/auth.controller');
var tokenMiddleware = require('../utils/common');

module.exports = function (app) {
    app.post('/api/user/login', authController.login);
    app.post('/api/user/register', userController.createUser);

    app.get('/api/business/list', tokenMiddleware.verifyToken, function(req, res){
        res.status(200).json({
            "data": [
                {
                    "name": "Laundary",
                    "phone": "092532654120"
                },{
                    "name": "ABCD",
                    "phone": "123456789"
                }
            ]
        });
    });
 }
