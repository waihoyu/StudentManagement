var mongoose = require('mongoose')

var studentSchema = new mongoose.Schema({
    sid: Number,
    name: String,
    sex:String,
    age:Number
})

studentSchema.statics.addStudent = function (json,callback) {
    Student.checkSid(json.sid,function (torf) {
        if (torf){
            var s = new Student(json)
            s.save()
            callback(1)
        }else {
            callback(-1)
        }
    })
    var s = new Student(json)
    s.save()
    // this.insertOne(json, function (err) {
    //     if (err){
    //         console.log("插入失败");
    //         return
    //     }
    //     console.log("插入成功");
    // })
}

studentSchema.statics.checkSid = function (sid,callback) {
    this.find({"sid":sid},function (err,results) {
        callback(results.length == 0)
    })
    // var s = new Student(json)
    // s.save()

}

var Student = mongoose.model("Student",studentSchema)

module.exports = Student



