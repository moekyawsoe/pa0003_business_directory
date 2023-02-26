var adminController = require('../controllers/web/admin.controller');

module.exports = function(app) {
    app.post('/admin/create', adminController.createAdmin);
    app.get('/admin/list', adminController.AdminList);
    app.get('/admin/details/:id', adminController.AdminDetails);
    app.put('/admin/update/:id', adminController.updateAdmin);
    app.delete('/admin/delete/:id', adminController.deleteAdmin);
}