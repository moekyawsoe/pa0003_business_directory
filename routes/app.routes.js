var pagesController = require('../controllers/pages.controller');
var sessionMiddleware = require('../utils/sessions');
var authController = require('../controllers/web/auth.controller');

module.exports = (app) => {
    app.get('/login',  pagesController.getLoginPage);
    app.post('/portal/login', authController.login);
    app.get('/', sessionMiddleware.checkSession, pagesController.getIndexPage);
    
}