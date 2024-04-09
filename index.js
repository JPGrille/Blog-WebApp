import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var numberOfLetters = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/newPost", (req, res) => {
    res.render("post.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/submit", (req, res) => {
  const postContent = req.body["post"];
  res.render("index.ejs", { newPostContent: postContent });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
