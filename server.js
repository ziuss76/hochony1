const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser') //요청데이터(body) 해석을 쉽게 도와줌, POST요청 하려면 필요
app.use(bodyParser.urlencoded({extended : true}));
require('dotenv').config() //환경변수 라이브러리 dotenv

app.use(express.json());
var cors = require('cors');
app.use(cors()); //nodejs 와 react 사이 ajax 요청 사용하기

const PORT = process.env.PORT || 8080;

var db; //변수 하나 필요
MongoClient.connect(process.env.MONGODB_URI, {useUnifiedTopology: true }, function(에러, client){
     //연결되면 할일
    if(에러) return console.log(에러) //에러 나오면 콘솔에 띄우기
    app.listen(PORT, function () {
      console.log('listening on localhost')
    }); 
     db = client.db('ShopData'); //ShopData 이라는 db에 연결
     console.log('listening on db')
});

app.use(express.static(path.join(__dirname, '/hochony-front/build')));

app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/hochony-front/build/index.html'));
  });

app.get('/content', function(요청, 응답){
    db.collection('Data').find().toArray(function(에러, 결과){
      console.log(결과);
      응답.json(결과);
    });
});

app.get('/search', function(요청, 응답){
  let 검색조건 = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: 요청.query.value,
          path: ['title', 'content']  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        }
      }
    }
  ] 
  db.collection('Data').aggregate(검색조건).toArray(function(에러, 결과){
    console.log(결과);
    응답.json(결과);
  })
});

app.get('/getReview', function(요청, 응답){
  db.collection('Review').find().toArray(function(에러, 결과){
    console.log(결과);
    응답.json(결과);
  });
});

app.post('/postReview', function(요청, 응답){
  db.collection('ReviewCount').findOne({name : '게시물개수'}, function(에러, 결과){
    var 총게시물개수 = 결과.totalPost;
    db.collection('ReviewCount').updateOne( {name : '게시물개수' } , { $inc : { totalPost : 1 } } , function(에러, 결과){
      db.collection('Review').insertOne( { _id : (총게시물개수 + 1), 점수 : 요청.body[0], 내용 : 요청.body[1], } , function(){
        응답.send('전송완료');
      });
    })
  });
});

app.put('/putReview', function(요청, 응답){
  db.collection('Review').updateOne( {_id : 요청.body[0]}, { $set : {점수 : 요청.body[1], 내용 : 요청.body[2]}, function(){
    응답.send('수정완료')
  }})
})

app.delete('/deleteReview', function(요청, 응답){
  db.collection('Review').deleteOne(요청.body, function(에러, 결과){
    console.log('삭제완료')
  })
  응답.send('삭제완료')
})

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/hochony-front/build/index.html'));
});

// npm start
// = nodemon server.js 로 설정함