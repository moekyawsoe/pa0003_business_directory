
exports.successResponse = (req, res, message, data) => {
    var successFormat = {
        "code" : 200,
        "message" : message,
        "data": data
    }
    res.status(200).json(successFormat);
}

exports.errorResponse = (req, res, message) => {
    var errorFormat = {
        "code" : 404,
        "message" : message
    }
    res.status(200).json(errorFormat);
}