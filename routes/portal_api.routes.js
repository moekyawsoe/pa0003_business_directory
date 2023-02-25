var adminController = require('../controllers/web/admin.controller');

module.exports = function(app) {
    app.post('/admin/create', adminController.createAdmin);
    app.get('/admin/list', adminController.AdminList);
}