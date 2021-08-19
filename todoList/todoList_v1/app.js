const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
})); //body parser
app.use(express.static(__dirname + '/public')); //check file in public directory


let items = ["Buy Food", "Cook Food", "Eat Food"];
let works = [];

app.get('/', function(req, res) {
  let day = date.getDate();

  res.render('list', {
    listTitle: day,
    newItems: items
  });


});

app.post('/', function(req, res){
  let item = req.body.newItem;

  if(req.body.list == "Work"){
    works.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
  //console.log("New item: " + item);
})

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newItems:works});
});

app.get("/about", function(req, res){
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
