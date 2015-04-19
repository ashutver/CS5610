var mongoose = require('mongoose');
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610';
mongoose.connect(connectionString);

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));
//****For NodeJs experiments*******************************************
var developers = [
    { firstName: "Christian", lastName: "Bale" },
    { firstName: "Tom", lastName: "Hardy" },
    { firstName: "Heath", lastName: "Ledger" }
];
app.post("/api/developer", function (req, res) {
    var obj = req.body;
    developers.push(obj);
    res.json(developers);
});
app.delete("/api/developer/:id", function (req, res) {
    var index = req.params.id;
    developers.splice(index, 1);
    res.json(developers);
});

app.get("/api/developer", function (req, res) {
    res.json(developers);
});
app.get("/api/developer/:index", function (req, res) {
    var idx = req.params['index'];
    res.json(developers[idx]);
});
app.put("/api/developer/:index", function (req, res) {
    var obj = req.body;
    developers[req.params.index] = obj;
    res.json(developers);
});
/******************************end of NodeJs experiment*********************/

//************** Schema for courses involving Mongo db*****************************************
var projectSchema = new mongoose.Schema({
    name: String,
    created:{type:Date , default:Date.now}
});

var CourseSchema = new mongoose.Schema({
    courseName: String,
    branch : String,
    created: { type: Date, default: Date.now },
    project: [projectSchema]
}, { collection: "course" });

var Course = mongoose.model("Course", CourseSchema);
/*
Form.findById("54f8c23bc7 c19bf079a3075e", function (err, data) {
    console.log(data);
});*/

/************express********/
app.get('/api/course', function (req, res) {
    Course.find(function (err, data) {
       res.json(data);
    });
});
app.get('/api/course:id', function (req, res) {
    Course.findById(req.params.id, function (err, data) {
        res.json(data);
      });
});
app.delete('/api/course:id', function (req, res) {
    Course.remove({ _id: req.params.id }, function (err, count) {
        Course.find(function (err, data) {
            res.json(data);
        });
    });
});
app.post('/api/course', function (req, res) {
    var obj = req.body;
    Course.create(obj, function (err, data) {
        Course.find(function (err, data) {
            res.json(data);
        });
    });
});

app.put('/api/course/:index', function (req, res) {
    Course.update({ _id: req.params.index }, {
        $set: {
            courseName: req.body.courseName,
            branch: req.body.branch,
            project: req.body.project
        }
    },
    function (err, doc) {
        console.log(req.body);
        Course.find(function (err, data) {
            res.json(data);
        });
       });
});

app.get('/api/course/:index/page', function (req, res) {
    Course.findById(req.params.index, function (err, data) {
        res.json(data.project);
    });
});
app.delete('/api/course/:id/page/:pageId', function (req, res) {
    Course.remove({ _id: req.params.id }, function (err, count) {
        Course.find(function (err, data) {
            res.json(data);
        });
    });
});
//************** Schema for courses involving Mongo db ends*****************************************

/********************** For user schema***************/


var UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String
}, { collection: "user" });

var User = mongoose.model("User", UserSchema);



/************express********/
app.get('/api/user', function (req, res) {
    User.find(function (err, data) {
        res.json(data);
    });
});

app.delete('/api/user:id', function (req, res) {
    User.remove({ _id: req.params.id }, function (err, count) {
        User.find(function (err, data) {
            res.json(data);
        });
    });
});
app.post('/api/user', function (req, res) {
    var obj = req.body;
    User.findOne(obj, function (err, data) {
        res.json(data);
    });
});
app.post('/api/user/add', function (req, res) {
    var obj = req.body;
    User.create(obj, function (err, data) {
        console.log("inserted");
    });
});

/*app.get('/api/profile:username', function (req, res) {
    var username = req.params.username;
    console.log("in server in profile controller");
    res.json(login(username, username));

})*/
/********************** end of user scheme******************/

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);


