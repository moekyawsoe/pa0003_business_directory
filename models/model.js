const mysql = require('../helpers/database');

module.exports = class Model {
    constructor(table){
        this.table = table;
    }

    get_all(){
        let tb = this;
        return new Promise((resolve, reject) => {
            mysql.query_filter('SELECT * FROM ??', [tb.table], (error, result) => {
                if(error) throw error;
                resolve(result);
            });
        });
    }

    find(id){
        let tb = this;
        return new Promise((resolve, reject) => {
            mysql.query_filter('SELECT * FROM ?? WHERE id = ?', [tb.table, id], (error, result) => {
                if(error) throw error;
                resolve(result[0]);
            });
        });
    }

    findWithName(col, value){
        let tb = this;
        return new Promise((resolve, reject) => {
            mysql.query_filter('SELECT * FROM ?? WHERE '+ col +' = ?', [tb.table, value], (error, result) => {
                if(error) throw error;
                resolve(result[0]);
            });
        });
    }

    create(data){
        let tb = this;
        return new Promise((resolve, reject) => {
            mysql.query_filter('INSERT INTO ?? SET ?', [tb.table, data], (error, result) => {
                if(error) throw error;
                let data = tb.find(result.insertId);
                data.then((value) => resolve(value))
                .catch((err) => reject(err));
            });
        });
    }

    createLog(data){
        let tb = this;
        return new Promise((resolve, reject) => {
            mysql.query_filter('INSERT INTO ?? SET ?', [tb.table, data], (error, result) => {
                if(error) throw error;
                resolve(result);
            });
        });
    }

    update(id, data){
        let tb = this;
        return new Promise((resolve, reject) => {
            mysql.query_filter('UPDATE  ?? SET ? WHERE id = ?', [tb.table, data, id], (error, result) => {
                let data = tb.find(id);
                data.then((value) => resolve(value))
                .catch((err) => reject(err));
            });
        });
    }

    delete(id){
        let tb = this;
        return new Promise((resolve, reject) => {
            mysql.query_filter('DELETE FROM  ??  WHERE id = ?', [tb.table, id], (error, result) => {
                if(error) throw error;
                resolve('Success');
            });
        });
    }

}