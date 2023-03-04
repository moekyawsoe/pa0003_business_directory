var sessions = require('../../utils/sessions');

exports.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if(email == "admin@gmail.com" && password == "12345"){
        sessions.createSession(req, {email : "admin@gmail.com"});
        res.status(200).json({
            url : "/"
        });
    }else{
        res.status(404).json({
            message : "User not found"
        });
    }
}

exports.logout = () => {
    
}