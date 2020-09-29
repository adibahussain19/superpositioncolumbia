var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash");

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

var eventSchema = new mongoose.Schema({
    title: String,
    imagelink: String, 
    description: String,
});

var Event = mongoose.model("Event", eventSchema);

var photoSchema = new mongoose.Schema({
    image: String, 
    caption: String,
});

var Photo = mongoose.model("Photo", photoSchema);

Event.create({
    title: "First Meeting",
    imagelink: "https://lh3.googleusercontent.com/Gx7tvQ49EKWZUMnRgFR1fFwyJwfucSaq9AXU2Ihae1rpPup59qSFO79uMILFQIrP14FtXP4eY2FQ2F9gh4wgcqy3FFtd5bC5tqGm0_9Emq8P61IUgYwXbZ7Bmnv9XC8bRvHu3iQHrw=w2400",
    description: "Our first meeting happened on September 16, 2020. A great start to a new year!"
});

Photo.create({
    image: "https://lh3.googleusercontent.com/Gx7tvQ49EKWZUMnRgFR1fFwyJwfucSaq9AXU2Ihae1rpPup59qSFO79uMILFQIrP14FtXP4eY2FQ2F9gh4wgcqy3FFtd5bC5tqGm0_9Emq8P61IUgYwXbZ7Bmnv9XC8bRvHu3iQHrw=w2400",
    caption: "Our first meeting happened on September 16, 2020. A great start to a new year!"
});


app.get("/", function(req, res){
    res.redirect("/home");
});

app.get("/home", function(req, res){
    Event.find({}, function(err, events){
        if(err) {
            console.log(err);
        }

        else {
            Photo.find({}, function(err, photos){
                if(err) {
                    console.log(err);
                }

                else {
                    res.render("index", {events, photos});
                }
            });
        }
    });
});

app.listen((process.env.PORT || 4040), function(req,res){
    console.log("Superposition Site has started");
});