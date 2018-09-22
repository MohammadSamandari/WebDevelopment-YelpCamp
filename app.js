var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

// requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// we Set the Enviroment Variable in the command line with set comman.
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://lord:passw0rd@ds127300.mlab.com:27300/lord_yelp_camp");

//seedDB();    //seed the database

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "YelpCamp Application",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this line of code, pass req.user to every single route.
app.use(function (req, res, next) {
    // we add our own little middleware. what ever function we give it, will be run in every route.
    // we are going to pass that re.user to every single template
    // What ever we put in res.locals, is what's available inside of our template.
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    // we need to move on to next code
    next();
});



// this prefixes are added before ever route in each route file.
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// we added this variable so that it can be run both locally and on the server as well.
var port = process.env.PORT || 3000;

app.listen(port, process.env.IP, function () {
    console.log("YelpCamp Server Has Started!");
});