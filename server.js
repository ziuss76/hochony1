import express from "express";
import path from "path";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser"; // 요청데이터(body) 해석을 쉽게 도와줌, POST요청 하려면 필요
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url"; // 파일경로 읽는 fileURLToPath 함수 필요
import jwt_decode from "jwt-decode";

const app = express();
// Middleware
app.use(express.json());
app.use(
  cors({
    // * 대신 true 쓰는 이유: 브라우저가 요청을 보내는 도메인 (Origin)을 확인할 수 있게 해주고
    // 나중에 서버에서 허용할 도메인을 동적으로 결정할 수 있도록 함, 그래서 확장성에도 유리
    origin: ["hochony.com", "http://localhost:8080"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // 나중에 쿠키에 저장된 인증정보를 함께 전송할 때 필요함
    maxAge: 7200, // 2시간 동안 preflight 요청 중복을 막아줌, 실제 데이터 요청 전에 보내는 CORS 허용을 위한 요청
    optionsSuccessStatus: 200, // 이 프리플라이트 요청에 대한 응답 코드
  })
);
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
      result.sort((a, b) => a.id - b.id);
      res.json(result);
    });
});

app.get("/search", (req, res) => {
  let 검색조건 = [];
  if (!req.query.value) {
    검색조건 = [];
  } else {
    검색조건 = [
      {
        $search: {
          index: "titleSearch",
          text: {
            query: req.query.value,
            path: ["title", "content"], // 제목과 내용에서 검색하도록 설정합니다
          },
        },
      },
    ];
  }

  db.collection("Data")
    .aggregate(검색조건)
    .toArray((err, result) => {
      if (err) {
        console.log("불러오기 실패!");
        res.status(500).send("불러오기 실패!");
      } else {
        result.sort((a, b) => a.id - b.id); // 데이터를 id 기준으로 정렬합니다.
        res.json(result);
      }
    });
});

app.post("/login", (req, res) => {
  const { accessToken } = req.body;
  try {
    const decodedToken = jwt_decode(accessToken);
    const { name, picture } = decodedToken;

    res.json({ name, picture });
  } catch (error) {
    console.log("Failed to decode access token", error);
    res.status(400).json({ error: "Invalid access token" });
  }
});

app.get("/getReview/:id", (req, res) => {
  const id = req.params.id;
  db.collection("Review")
    .find({ id: parseInt(id) })
    .toArray((err, result) => {
      res.json(result);
    });
});

app.post("/postReview/:id", (req, res) => {
  const id = req.params.id;
  const rating = req.body[0];
  const review = req.body[1];
  const userName = req.body[2];

  db.collection("ReviewCount").findOne({ name: "게시물개수" }, (err, result) => {
    const 총게시물개수 = result.totalPost;

    db.collection("ReviewCount").updateOne({ name: "게시물개수" }, { $inc: { totalPost: 1 } }, (err, result) => {
      db.collection("Review").insertOne({ _id: 총게시물개수 + 1, id: parseInt(id), 점수: rating, 내용: review, 유저네임: userName }, () => {
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
  db.collection("Review").deleteOne(req.body, (err, result) => {});
  res.send("삭제완료");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/hochony-front/build/index.html"));
});

// npm start
