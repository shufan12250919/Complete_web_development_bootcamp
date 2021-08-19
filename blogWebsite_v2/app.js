//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Use this website for daily document.";
const aboutContent = "This is a website that make for practice purpose.";
const contactContent = "If there is any problem, please contact Shu-Fan Lin at frankfrank410@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){

  Post.find({}, function(err, foundPost){
    if(!err){
        res.render("home", {
          startingContent: homeStartingContent,
          posts: foundPost
        });
    }
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  })

  newPost.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postId", function(req, res){

  Post.findOne({_id: req.params.postId}, function(err, foundPost){
    if(!err){
      res.render("post", {
        title: foundPost.title,
        content: foundPost.content
      });
    }
  });
  

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
