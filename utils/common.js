var md5 = require('md5');
var moment = require('moment');

exports.encryptPassword = (password) => {
    return md5(md5(password) + 'tom&cherry');
}

exports.now = () => {
    const date = new Date();
    return moment(date).format('YYYY-MM-DD hh:mm:ss');
}