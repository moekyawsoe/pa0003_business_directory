var mysql = require('../helpers/database');

exports.checkUser = (username) => {
    return new Promise((resolve, reject) => {
        var query = `
        SELECT *
        FROM tbl_users WHERE username = ?;
        `;
        mysql.query_filter(query, [username], (err, result) => {
            if(err){
                reject(err);
            }else{
                
                if(result.length > 0){
                    resolve(result[0]);
                }else{
                    resolve(0);
                }
            }
        });
    });
}