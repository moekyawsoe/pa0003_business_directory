
exports.getIndexPage = (req, res) => {
    res.render('pages/index', {
        title : 'Ray App'
    });
}