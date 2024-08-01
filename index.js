import express from "express";
import bodyParser from "body-parser";

let data = [
  {
    title: 'Exploring the Serene Beaches of Bali',
    date: 'February 28, 2024',
    summary: 'Bali, known as the Island of the Gods, is a destination that beckons travelers with its stunning beaches, rich culture, and lush landscapes. Join me as I recount my recent adventure exploring the serene beaches of Bali.',
    img: '/images/bali.jpg'
  },
  {
    title: 'A Safari Adventure in the Maasai Mara',
    date: 'December 18, 2023',
    summary: 'Nestled in the heart of Kenya, the Maasai Mara National Reserve is renowned for its breathtaking landscapes and abundant wildlife. Join me as I recount my unforgettable safari adventure in this iconic destination.',
    img: '/images/maasai-mara.jpg'
  },
  {
    title: 'Discovering the Charms of Coastal California',
    date: 'November 10, 2023',
    summary: 'California, with its diverse landscapes and vibrant culture, offers endless opportunities for exploration and adventure. Join me as I recount my journey along the stunning coast of the Golden State, from the iconic beaches of Southern California to the rugged shores of the North Coast.',
    img: '/images/big_sur.JPG'
  },
  {
    title: 'Exploring the Serene Beaches of Bali',
    date: 'February 28, 2024',
    summary: 'Bali, known as the Island of the Gods, is a destination that beckons travelers with its stunning beaches, rich culture, and lush landscapes. Join me as I recount my recent adventure exploring the serene beaches of Bali.',
    img: '/images/bali.jpg'
  },
  {
    title: 'A Safari Adventure in the Maasai Mara',
    date: 'December 18, 2023',
    summary: 'Nestled in the heart of Kenya, the Maasai Mara National Reserve is renowned for its breathtaking landscapes and abundant wildlife. Join me as I recount my unforgettable safari adventure in this iconic destination.',
    img: '/images/maasai-mara.jpg'
  },
  {
    title: 'Discovering the Charms of Coastal California',
    date: 'November 10, 2023',
    summary: 'California, with its diverse landscapes and vibrant culture, offers endless opportunities for exploration and adventure. Join me as I recount my journey along the stunning coast of the Golden State, from the iconic beaches of Southern California to the rugged shores of the North Coast.',
    img: '/images/big_sur.JPG'
  }
  // {
  //   title: 'Test Title',
  //   date: '',
  //   summary: '',
  //   img: ''
  // },
]

const app = express();
const port = 3000;
var numberOfLetters = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs",
    {postsData: data}
  );
});

app.get("/newPost", (req, res) => {
    res.render("post.ejs");
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
