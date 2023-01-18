import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Form, Carousel, InputGroup, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Data from "./data.js"; // Data 자리엔 자유롭게 작명가능
import Detail from "./Detail.js";
import Cart from "./Cart.js";
import Login from "./Login.js";
import "./Cart.scss";
import axios from "axios";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';



function App() { 
  let [hochony, hochony변경] = useState(Data); //Data는 data.js 에 있는 데이터 전체
  let [검색, 검색변경] = useState('');
  let [더보기, 더보기변경] = useState(false);
  let [구글로그인, 구글로그인변경] = useState(true);

  return (
    <div className="App">
      <Navbar sticky="top" bg="light" variant="light">
      <Container fluid> 
      <Nav.Link as={Link} to="/">
        <img
          alt=""
          src="https://ziuss76.github.io/hochoicon.svg"
          width="35px"
          height="35px"
          className="hochoicon"
        />
        </Nav.Link>
        <Container className='col-md-4'>
        <InputGroup
        onChange={(e)=>{
          e.preventDefault();
          검색변경(e.target.value);
          console.log(e.target.value)}}>
        <Form.Control
          placeholder="Hochony Shop"
        />
        <button type="search"
          className="me-1 buttonSearch"
          size="sm"
          style={{ width: '3rem' } }
          onClick={() => {
          axios //axios는 JSON 을 예쁘게 Object 형으로 바꿔줌 즉 따옴표 다 떼줌! fetch는 그런거 없음ㅅㄱ
            .get('/search?value=' + 검색) //get 요청 할 주소
            .then((result) => {
              console.log(result.data);
              //then 은 요청 성공시 실행할 코드, result.data 는 받아온 데이터
              hochony변경([...result.data]);
              더보기변경(false);
            })
            .catch(() => {
              //catch 는 요청 실패시 실행할 코드
              console.log("불러오기 실패!");
            });
        }}
        >
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/></button>
      </InputGroup>
      </Container>
      
    {/* Form, FormControl 쓰려면 Container 에 fluid 속성 필요! */}
    <Nav>
      <div className="icon" >
      <Nav.Link as={Link} to="/cart"><FontAwesomeIcon icon={faCartPlus} className="navicon"/></Nav.Link>
      <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faUser} className="navicon"/></Nav.Link>
      </div>
    </Nav>
      
    </Container>
  </Navbar>
  {/* Switch 쓰면 하나하나 exact 안 붙여도 됨! 6버전 이후로 Switch => Routes */}
  <Routes>
        <Route path="/" element={<Main hochony={hochony} hochony변경={hochony변경} 더보기={더보기} 더보기변경={더보기변경} 구글로그인={구글로그인} 구글로그인변경={구글로그인변경}/>}/>
        <Route path="/detail/:id" element={<Detail hochony={hochony}/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}
function Main(props) {
  
  return (
    <>
    <Container className="col-md-10"> 
          <Carousel className="my-5 mx-3 Carousel">
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100"
                src="https://ziuss76.github.io/images/hochonybg1.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h4>자, 이제 당신도 호집사</h4>
                <h6>젤리맛좀 볼테야?</h6>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100"
                src="https://ziuss76.github.io/images/hochonybg2.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
              <h4>이 천사같은 모습</h4>
                <h6>그냥 지나칠 수 없지</h6>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="https://ziuss76.github.io/images/hochonybg3.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
              <h4>호천이님의</h4>
                <h6>앙큼한 귀여움을 팔아요</h6>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </Container>

<div className="container">
<div className="row">
  {props.hochony.map((a, i) => {
    return <Card hochony={props.hochony[i]} i={i} key={i}/>; //hochony 중에 hochony[i] 만 전송한다
  })}
</div>
{props.구글로그인 === true? <div className='googleText'><Badge pill bg="warning" text="dark">
구글 로그인 하고 더보기! </Badge></div> : null}
{props.구글로그인 === true? <div className='googleBox'>
  <GoogleOAuthProvider clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID}>
<GoogleLogin
          text='signin_with'
          shape='pill'
          onSuccess={(credentialResponse) => {
            // console.log(credentialResponse);
            props.구글로그인변경(false)
            props.더보기변경(true)
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
</GoogleOAuthProvider></div> : null}

{ props.더보기 === true ?
<button
className="buttonYellow"
style={{width: 85}}
onClick={() => {
  axios
    .get('/content')
    .then((result) => {
      console.log(result.data);
      props.hochony변경([...props.hochony, ...result.data.sort((a,b)=> a.id - b.id)]);
      props.더보기변경(false);
    })
    .catch(() => {
      console.log("불러오기 실패!");
    });
}}
>
더보기
</button> : null}
</div>
</>
  )
}

function Card(props) {
  let navigate = useNavigate();
  return (
    <div className="col-md-4">
      <img className='product-img'
        onClick={() => {
          navigate("/detail/" + props.hochony.id);
        }}
        src={"https://ziuss76.github.io/images/hochony" + (props.hochony.id + 115) + ".jpg"
        
        }
        alt="" width="90%"
      />
      <div className="product-box"
      onClick={() => {
        navigate("/detail/" + props.hochony.id);
      }}>
      <h4 className="photoTitle">{props.hochony.title}</h4>
      <p>
        {props.hochony.content}
      </p>
      <p>{props.hochony.price} won / {props.hochony.quan} units</p>
    </div>
    </div>
  );
}

export default App;
