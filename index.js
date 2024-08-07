import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

let data = [];

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "travel_blog",
  password: "1234",
  port: 5432,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let currentUserId = 1;
let users = [];

async function getPosts() {
  const result = await db.query("SELECT * FROM posts ORDER BY id ASC");
  let posts = [];
  result.rows.forEach((post) => { posts.push(post) });
  return posts;
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

app.get("/", async (req, res) => {
  data = await getPosts();
  console.log(data);
  res.render("index.ejs",
    {postsData: data}
  );
});

app.get("/newPost", async (req, res) => {
  const currentUser = await getCurrentUser();
  res.render("post.ejs",
    {user: currentUser}
  );
});

app.post("/newPost", async (req, res) => {
  const title = req.body["postTitle"];
  const content = req.body["postContent"];
  const currentUser = await getCurrentUser();
  const today = 'CURRENT_TIMESTAMP';
  const img = '/images/big_sur.JPG';

  try {
    await db.query(
      "INSERT INTO posts (title, summary, date, img, user_id) VALUES ($1, $2, $3, $4, $5)",
      [title, content, new Date(), img, currentUserId]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/submit", (req, res) => {
  const postContent = req.body["post"];
  console.log(postContent);
  res.render("index.ejs", { newPostContent: postContent });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
