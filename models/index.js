const Model = require('../models/model');

class UsersModel extends Model {
    constructor(){
        super('tbl_users');
    }
}

class BusinessModel  extends Model {
   constructor(){
        super('tbl_business');
   }
}

class TypesModel extends Model {
    constructor(){
        super('tbl_bus_types');
    }
}

class CategoryModel extends Model {
    constructor(){
        super('tbl_bus_category');
    }
}

class AdminModel extends Model{
    constructor(){
        super('tbl_admin');
    }
}

exports.UsersModel = new UsersModel;
exports.AdminModel = new AdminModel;
exports.CategoryModel = new CategoryModel;
exports.TypesModel = new TypesModel;
exports.BusinessModel = new BusinessModel;