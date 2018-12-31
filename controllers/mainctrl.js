var Student = require("../models/Student")
var formidable = require("formidable")
var url = require("url")

exports.showIndex = function (request, response) {
    response.render("index")
}

exports.showAdd = function (request, response) {
    response.render("add")
}

exports.checkStudent = function (request, response) {
    var sid = request.params.sid;
    Student.checkSid(sid, function (torf) {
        response.json({"result": torf})
    })
}

exports.updateStudent = function (request, response) {
    var sid = request.params.sid
    var form = new formidable.IncomingForm()
    form.parse(request,function (err,fields,files) {
        Student.find({"sid":sid},function (err,results) {
            if (!results || results.length == 0){
                response.send("查无此人，请检查网址")
                return
            }
            var theStudent = results[0]
            theStudent.name = fields.name
            theStudent.age = fields.age
            theStudent.sex = fields.sex
            console.log("test1");
            theStudent.save(function (err) {
                if (err){
                    response.send("1")
                    console.log(err);
                }
                else
                {
                    response.send("-1")
                    console.log("success");
                }
            })
        })
    })

}

exports.showStudent = function (request, response) {
    response.render("update")
}

exports.getAllStudent = function (request, response) {
    var page = url.parse(request.url,true).query.page - 1 || 0
    Student.count({},function (err,count) {
        Student.find({}).limit(4).skip(4*page).exec(function (err,results) {
            response.json({
                "pageAmount":Math.ceil((count/4)),
                "results":results
            })
        })
    })
}

exports.deleteStudent = function (request, response) {
    var sid = request.params.sid
    Student.find({"sid":sid},function (err,results) {

        results[0].remove(function (err) {
            if (err){
                response.json({"result":-1})
                return
            }else {
                response.json({"result":1})
                return
            }
        })
    })
}

exports.showUpdate = function (request, response) {
    var sid = request.params.sid
    Student.find({"sid":sid},function (err,results) {
        if (!results || results.length == 0){
            response.send("查无此人，请检查网址")
            return
        }
        response.render("update",{
            info:   results[0]
        })
    })
}

exports.doAddStudent = function (request, response) {
    var form = new formidable.IncomingForm()
    form.parse(request, function (err, fields, files) {
        Student.addStudent(fields, function (result) {
            // if (result == 1){
            response.json({"result": result})
            // }
        })
    })
}

