import express from "express";
import path from "path";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser"; // 요청데이터(body) 해석을 쉽게 도와줌, POST요청 하려면 필요
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url"; // 파일경로 읽는 fileURLToPath 함수 필요

const app = express();
app.use(express.json());
app.use(cors()); //nodejs 와 react 사이 ajax 요청 사용하기
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

const __filename = fileURLToPath(import.meta.url); // 현재 파일의 경로
const __dirname = path.dirname(__filename); // 현재 파일의 디렉토리 경로

const PORT = process.env.PORT || 8080;

const uri = process.env.MONGODB_URI;
const dbName = "ShopData";
let db;

async function startServer() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log("listening on db");
    app.listen(PORT, () => {
      console.log("listening on localhost");
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();

app.use(express.static(path.join(__dirname, "/hochony-front/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/hochony-front/build/index.html"));
});

app.get("/content", (req, res) => {
  db.collection("Data")
    .find()
    .toArray((err, result) => {
      // console.log(result);
      res.json(result);
    });
});

app.get("/search", (req, res) => {
  const 검색조건 = [
    {
      $search: {
        index: "titleSearch",
        text: {
          query: req.query.value,
          path: ["title", "content"], // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        },
      },
    },
  ];
  db.collection("Data")
    .aggregate(검색조건)
    .toArray((err, result) => {
      // console.log(result);
      res.json(result);
    });
});

app.get("/getReview/:id", (req, res) => {
  const id = req.params.id;
  db.collection("Review")
    .find({ id: parseInt(id) })
    .toArray((err, result) => {
      // console.log(result);
      res.json(result);
    });
});

app.post("/postReview/:id", (req, res) => {
  const id = req.params.id;
  const rating = req.body[0];
  const review = req.body[1];

  db.collection("ReviewCount").findOne({ name: "게시물개수" }, (err, result) => {
    const 총게시물개수 = result.totalPost;

    db.collection("ReviewCount").updateOne({ name: "게시물개수" }, { $inc: { totalPost: 1 } }, (err, result) => {
      db.collection("Review").insertOne({ _id: 총게시물개수 + 1, id: parseInt(id), 점수: rating, 내용: review }, () => {
        res.send("전송완료");
      });
    });
  });
});

app.put("/putReview", (req, res) => {
  db.collection("Review").updateOne({ _id: req.body[0] }, { $set: { 점수: req.body[1], 내용: req.body[2] } }, () => {
    res.send("수정완료");
  });
});

app.delete("/deleteReview", (req, res) => {
  db.collection("Review").deleteOne(req.body, (err, result) => {
    // console.log("삭제완료");
  });
  res.send("삭제완료");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/hochony-front/build/index.html"));
});

// npm start
