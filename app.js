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

app.get('/', mainctrl.showIndex)
app.get('/add', mainctrl.showAdd)
app.post('/add', mainctrl.doAdd)
app.propfind('/:sid', mainctrl.check)
app.post('/:sid', mainctrl.update)
app.delete('/:sid', mainctrl.delete)

app.use(express.static("public"))
app.listen(5000)
