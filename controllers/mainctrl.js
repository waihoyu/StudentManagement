var Student = require("../models/Student")
var formidable = require("formidable")
var url = require("url")

exports.showIndex = function (request, reponse) {
    reponse.render("index")
}

exports.showAdd = function (request, reponse) {
    reponse.render("add")
}

exports.check = function (request, response) {
    var sid = request.params.sid;
    Student.checkSid(sid, function (torf) {
        response.json({"result": torf})
    })
}

exports.update = function (request, reponse) {

}

exports.delete = function (request, reponse) {

}

exports.doAdd = function (request, response) {
    var form = new formidable.IncomingForm()
    form.parse(request, function (err, fields, files) {
        Student.addStudent(fields, function (result) {
            // if (result == 1){
            response.json({"result": result})
            // }
        })
    })
}

