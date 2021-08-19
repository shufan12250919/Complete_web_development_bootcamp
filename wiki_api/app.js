const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",  {useNewUrlParser: true, useUnifiedTopology: true });

const articleShema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleShema);

app.route("/articles")
  .get(function(req, res){
    Article.find(function(err, foundArticles){
      if(!err){
        res.send(foundArticles);
      }else{
        res.send(err);
      }
    });
  })

  .post(function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err){
      if(!err){
        res.send("Successfully added a new article!");
      }else{
        res.send(err);
      }
    });
  })

  .delete(function(req, res){
    Article.deleteMany(function(err){
      if(!err){
        res.send("Successfully deleted all articles!");
      }else{
        res.send(err);
      }
    });
  });

app.route("/articles/:requestTitle")
  .get(function(req, res){
    Article.findOne({title: req.params.requestTitle}, function(err, foundArticle){
      if(foundArticle){
        res.send(foundArticle);
      }else{
        res.send("No article found!");
      }
    });
  })

  .put(function(req, res){
    Article.update(
      {title: req.params.requestTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      function(err){
        if(!err){
          res.send("Successfully updated article");
        }
    })
  })

  .patch(function(req, res){
    Article.update(
      {title: req.params.requestTitle},
      {$set: req.body},
      function(err){
        if(!err){
          res.send("Successfully updated article");
        }else{
          res.send(err);
        }
    })
  })

  .delete(function(req, res){
    Article.deleteOne({title: req.params.requestTitle}, function(err){
      if(!err){
        res.send("Successfully deleted article");
      }else{
        res.send(err);
      }
    })
  });




let port = 3000;
app.listen(port, function(){
  console.log("Server started on port" + port);
});
