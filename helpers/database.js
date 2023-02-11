var mysql = require('mysql');
var config = require('./config');
var page_par_rows = 10;
var pool = mysql.createPool(config.mysql_connection_string);

// var promisepool = mysql.createPromisePool(config.mysql_connection_string)

exports.getConnection = function (callback) {
    pool.getConnection(function (err, connection) {
        callback(err, connection);
    });
};

exports.select_rows = function (table, data, callback) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            var query = connection.query("SELECT ?? FROM ?? WHERE ? ", [data[0], table, data[1]], function (err, result) {
                connection.release();
                callback(err, result);
            });
            //console.log(query.sql);
        } else {
            //connection.release();
            callback(err, null);
        }
    });
};

exports.select_row = function (table, data, callback) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            var query = connection.query("SELECT ?? FROM ?? WHERE ? ", [data[0], table, data[1]], function (err, result) {
                connection.release();
                var row = result.length > 0 ? result[0] : null;
                callback(err, row);
            });
            //console.log(query.sql);
        } else {
            //connection.release();
            callback(err, null);
        }
    });
};

exports.select_one = function (table, data, callback) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            var query = connection.query("SELECT ?? FROM ?? WHERE ? ", [data[0], table, data[1]], function (err, result) {
                connection.release();
                var value = result.length > 0 ? result[0][data[0]] : null;
                callback(err, value);
            });
            //console.log(query.sql);
        } else {
            //connection.release();
            callback(err, null);
        }
    });
};

exports.insert = function (table, data, callback) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            var str = connection.query("INSERT INTO " + table + " SET ? ", data, function (err, result) {
                connection.release();
                callback(err, err ? null : result.insertId);
            });
           // console.log(str.sql);
        } else {
            //connection.release();
            callback(err, null);
        }
    });
};

exports.delete = function (table, filter, callback) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            connection.query("DELETE FROM " + table + " WHERE ? ", filter, function (err, result) {
                connection.release();
                callback(err, result.affectedRows);
            });
        } else {
            //connection.release();
            callback(err, null);
        }
    });
};

exports.update = function (table, data, filter, callback) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            var query = connection.query("UPDATE " + table + " SET ? WHERE ?", [data, filter], function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(err, result.affectedRows);
                }
                connection.release();
            }); 
            //console.log(query.sql);
        } else {
            //connection.release();
            callback(err, null);
        }
    });
};


exports.query = function (query, callback) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            connection.query(query, function (err, result) {
                callback(err, result);
            });
            connection.release();
        } else {
            //connection.release();
            console.log(err);
            callback(err, null);
            connection.release();
        }
    });
    //query = null;
};

exports.query_filter = function (query, filter, callback) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            var temp = connection.query(query, filter, function (err, result) {
                connection.release();
                callback(err, result);
            });
        } else {
            //connection.release();
            // console.log(err);
            callback(err, null);
        }
    });
};



exports.query_promise = function (query) {
    pool.getConnection(function (err, connection) {
        if (!err) {
            var temp = connection.query(query, filter, function (err, result) {
                connection.release();
                callback(err, result);
            });
            //console.log(temp.sql);
        } else {
            //connection.release();
            callback(err, null);
        }
    });
};

exports.datatable = function (params)
{
    //Paging
    var sLimit = "";
    if (params.start && params.length != -1) {
        sLimit = 'LIMIT ' + params.start + ', ' + params.length
    }

    //Ordering
    var sOrder = "";
    if (request['iSortCol_0']) {
        sOrder = 'ORDER BY ';

        for (var i = 0; i < request['iSortingCols']; i++) {
            if (request['bSortable_' + parseInt(request['iSortCol_' + i])] == "true") {
                sOrder += aColumns[parseInt(request['iSortCol_' + i])] + " " + request['sSortDir_' + i] + ", ";
            }
        }

        sOrder = sOrder.substring(0, sOrder.length - 2)
        if (sOrder == 'ORDER BY') {
            console.log("sOrder == ORDER BY");
            sOrder = "";
        }
    }

    //Filtering
    var sWhere = "";
    if (request['sSearch'] && request['sSearch'] != "") {
        sWhere = "WHERE (";
        for (var i = 0; i < aColumns.length; i++) {
            sWhere += aColumns[i] + " LIKE " + "\'%" + request['sSearch'] + "%\'" + " OR ";
        }

        sWhere = sWhere.substring(0, sWhere.length - 4);
        sWhere += ')';
    }

    //Individual column filtering
    for (var i = 0; i < aColumns.length; i++) {
        if (request['bSearchable_' + i] && request['bSearchable_' + i] == "true" && request['sSearch_' + i] != '') {
            if (sWhere == "") {
                sWhere = "WHERE ";
            }
            else {
                sWhere += " AND ";
            }
            sWhere += " " + aColumns[i] + " LIKE " + request['sSearch_' + i] + " ";
        }
    }

    //Queries
    var sQuery = "SELECT SQL_CALC_FOUND_ROWS " + aColumns.join(',') + " FROM " + sTable + " " + sWhere + " " + sOrder + " " + sLimit + "";

    var rResult = {};
    var rResultFilterTotal = {};
    var aResultFilterTotal = {};
    var iFilteredTotal = {};
    var iTotal = {};
    var rResultTotal = {};
    var aResultTotal = {};

    connection.query(sQuery, function selectCb(err, results, fields) {
        if (err) {
            console.log(err);
        }

        rResult = results;

        //Data set length after filtering 
        sQuery = "SELECT FOUND_ROWS()";

        connection.query(sQuery, function selectCb(err, results, fields) {
            if (err) {
                console.log(err);
            }
            rResultFilterTotal = results;
            aResultFilterTotal = rResultFilterTotal;
            iFilteredTotal = aResultFilterTotal[0]['FOUND_ROWS()'];

            //Total data set length 
            sQuery = "SELECT COUNT(" + sIndexColumn + ") FROM " + sTable;

            connection.query(sQuery, function selectCb(err, results, fields) {
                if (err) {
                    console.log(err);
                }
                rResultTotal = results;
                aResultTotal = rResultTotal;
                iTotal = aResultTotal[0]['COUNT(*)'];

                //Output
                var output = {};
                var temp = [];

                output.sEcho = parseInt(request['sEcho']);
                output.iTotalRecords = iTotal;
                output.iTotalDisplayRecords = iFilteredTotal;
                output.aaData = [];

                var aRow = rResult;
                var row = [];

                for (var i in aRow) {
                    for (Field in aRow[i]) {
                        if (!aRow[i].hasOwnProperty(Field)) continue;
                        temp.push(aRow[i][Field]);
                    }
                    output.aaData.push(temp);
                    temp = [];
                }
                sendJSON(res, 200, output);
            });
        });
    });
}