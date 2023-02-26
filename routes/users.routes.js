var userController = require('../controllers/web/users.controller');

module.exports = function(app) {
    app.post('/user/create', userController.createUser);
    app.get('/user/list', userController.UserList);
    app.get('/user/details/:id', userController.UserDetails);
    app.put('/user/update/:id', userController.updateUser);
    app.delete('/user/delete/:id', userController.deleteUser);
}