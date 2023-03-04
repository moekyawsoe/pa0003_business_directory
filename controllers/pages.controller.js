
exports.getIndexPage = (req, res) => {
    res.render('pages/index', {
        title : 'PA0003-Portal'
    });
}

exports.getLoginPage = (req, res) => {
    res.render('pages/auth/login', {
        title : 'PA0003-Login'
    });
}