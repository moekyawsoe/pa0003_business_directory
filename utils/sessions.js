require('dotenv').config();
var session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

exports.appSessionStore = (app) => {
    // session management
    var options = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    };
    
    var sessionStore = new MySQLStore(options);
    app.use(session(
    {
        secret: "rayhubpa0003",
        // maxAge: Date.now() + (30 * 86400 * 1000),
        maxAge: 3600,
        resave: true,
        saveUninitialized: true,
        store: sessionStore
    }));
}

exports.checkSession = (req, res, next) => {
    if (req.session.loggedin){
        return next();
    }else{
        res.redirect("/login");
    }
}

exports.createSession = (req, data) => {
    req.session.loggedin = true;
}

exports.destroySession = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log("Session Time Out");
        } else {
            res.redirect('/login');
        }
    });
}