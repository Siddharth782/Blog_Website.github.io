const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const { home } = require("nodemon/lib/utils");

const app = express();
mongoose.connect("mongodb+srv://Siddharth_782:Siddharth02@cluster0.13o5n.mongodb.net/blogDB", { useNewUrlParser: true });


const about = "its by me for me and will be me"
const contact = "Call me 8295593841"

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



const postsSchema = {
    title: String,
    content: String
}

const Posts = mongoose.model("Post", postsSchema);

const homeContent = new Posts({
    title: "Home",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint illo tempora perspiciatis neque ipsum delectus consequuntur deserunt reprehenderit sit adipisci.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint illo tempora perspiciatis neque ipsum delectus consequuntur deserunt reprehenderit sit adipisci.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint illo tempora perspiciatis neque ipsum delectus consequuntur deserunt reprehenderit sit adipisci."
})

const defaultPosts = [homeContent];


app.get("/", function (req, res) {

    Posts.find({}, function (err, posts) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("home", { posting: posts });
        }

    })

})

app.get("/about", function (req, res) {

    res.render("about", { about_me: about });
})

app.get("/contact", function (req, res) {

    res.render("contact", { contact_me: contact });
})

app.get("/compose", function (req, res) {
    res.render("compose");

})

app.post("/compose", function (req, res) {

    const postThings = new Posts({

        content: req.body.postBody,
        title: req.body.postTitle

    });
    postThings.save();
    res.redirect("/");
})


app.get("/posts/:postid", function (req, res) {

    let h;
    let requested = req.params.postid;

    Posts.findOne({ _id: requested }, function (err, foundPost) {
        if (!err) {
            if (foundPost) {
                console.log(foundPost);
                res.render("posts", { Title: foundPost.title, Content: foundPost.content });
            }
        }
    })

})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

app.listen(3000, function () {
    console.log("Server is running")
})