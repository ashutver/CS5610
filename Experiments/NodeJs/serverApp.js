var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

var alice = {
    username: "alice",
    password : "alice"
}
var developers = [
    { firstName: "john", lastName: "hawkins" },
    { firstName: "Bob", lastName: "Marc" },
    { firstName: "dan", lastName: "fetley" }
];
app.post("/developer", function (req, res) {
   /* var obj = {
        firstname: "first",
        lastName: "last"
    };*/
    var obj = req.body;
    developers.push(obj);
    res.json(developers);
});
app.delete("/developer/:id", function (req, res) {
    var index = req.params.id;
    developers.splice(index, 1);
    res.json(developers);
});

app.get("/alice", function (req, res) {
    res.json(alice);
});
app.get("/developer", function (req, res) {
    res.json(developers);
});
app.get("/developer/:index", function (req, res) {
    var idx = req.params['index'];
    // req.params.index   too
    res.json(developers[idx]);
});

app.listen(3000)