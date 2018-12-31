var express = require("express")
var app = express()
var mainctrl = require("./controllers/mainctrl.js")

var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/smv2', {useNewUrlParser: true}, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
})

app.set("view engine", "ejs")

app.get('/'                     , mainctrl.showIndex)
app.get('/add'                  , mainctrl.showAdd)
app.get('/student/:sid'         , mainctrl.showUpdate)
app.post    ('/student'         , mainctrl.doAddStudent)
app.propfind('/student/:sid'    , mainctrl.checkStudent)
app.post    ('/student/:sid'    , mainctrl.updateStudent)
app.delete  ('/student/:sid'    , mainctrl.deleteStudent)
app.get    ('/student'         , mainctrl.getAllStudent)

app.use(express.static("public"))

app.listen(5000)

