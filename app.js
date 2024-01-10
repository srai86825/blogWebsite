const express = require("express");
const bodyParser = require("body-parser");

//Setting up the server and ejs
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Setting up the Project DB
const mongoose = require("mongoose");
const { type } = require("os");
const { log } = require("console");
let db = "";
async function main(){
    try{
        db = mongoose.connect("mongodb://127.0.0.1:27017/blogsFinalDB", {useNewUrlParser: true});
        console.log("successfully connected to the database");
    } catch(err) {
        console.log(err);
    }
}
main();

const blog_schema = new mongoose.Schema({
    db_title: String,
    db_content: String,
});

const Blog = mongoose.model("blogs", blog_schema);

app.get("/", function(req, res){
    Blog.find().then(function(blog_list){
        res.render("home", {
            blogs: blog_list
        });
    });
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){
    const new_blog = Blog({
        db_title: req.body.title,
        db_content: req.body.content
    });
    new_blog.save();
    res.redirect("/");
})

//Listening to the port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});