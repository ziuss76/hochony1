import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Data from "./data.js"; // Data 자리엔 자유롭게 작명가능
import Detail from "./Detail.js";
import Cart from "./Cart.js";
import Main from "./Main.js";
import Login from "./Login.js";
import "./Button.scss";
import axios from "axios";
import ScrollTop from "./ScrollTop";

// import Data2 from "./data2.json";
// 주소창에 detail/3 부터 안뜨는 이유는 주소창에 치면 새로고침 됨
// 그래서 hochony가 3개밖에 없는 상태로 돌아감

function App() {
  const [hochony, hochony변경] = useState(Data); //Data는 data.js 에 있는 데이터 전체
  const [검색, 검색변경] = useState("");
  const [더보기, 더보기변경] = useState(false);
  const [구글로그인, 구글로그인변경] = useState(true);
  const [로그인완료, 로그인완료변경] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      로그인완료변경(false);
      구글로그인변경(true);
      더보기변경(false);
    } else {
      로그인완료변경(true);
      구글로그인변경(false);
      더보기변경(true);
    }
  }, []);

  return (
    <div className="App">
      <Navbar sticky="top" bg="light" variant="light">
        <Container fluid>
          <Nav.Link as={Link} to="/">
            <img alt="" src="https://storage.googleapis.com/hochony/hochoicon.jpeg" width="35px" height="35px" className="hochoicon" />
          </Nav.Link>
          <Container className="col-md-4">
            <InputGroup
              className="ms-4"
              onChange={(e) => {
                e.preventDefault();
                검색변경(e.target.value);
                console.log(e.target.value);
              }}
            >
              <Form.Control placeholder="Hochony Shop" />
              <button
                type="search"
                className="me-1 buttonSearch"
                size="sm"
                style={{ width: "3rem" }}
                onClick={() => {
                  axios //axios는 JSON 을 예쁘게 Object 형으로 바꿔줌 즉 따옴표 다 떼줌! fetch는 그런거 없음ㅅㄱ
                    .get("/search?value=" + 검색)
                    .then((result) => {
                      //console.log(result.data) result.data 는 받아온 데이터
                      hochony변경([...result.data]);
                      더보기변경(false);
                    })
                    .catch(() => {
                      console.log("불러오기 실패!");
                    });
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button>
            </InputGroup>
          </Container>

          {/* Form, FormControl 쓰려면 Container 에 fluid 속성 필요! */}
          <Nav>
            <div className="icon">
              <Nav.Link as={Link} to="/cart">
                <FontAwesomeIcon icon={faCartPlus} className="nav-icon cart-icon" />
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <FontAwesomeIcon icon={faUser} className="nav-icon login-icon" />
              </Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
      {/* Switch 쓰면 하나하나 exact 안 붙여도 됨! 6버전 이후로 Switch => Routes */}
      <ScrollTop />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              hochony={hochony}
              hochony변경={hochony변경}
              더보기={더보기}
              더보기변경={더보기변경}
              구글로그인={구글로그인}
              구글로그인변경={구글로그인변경}
              로그인완료={로그인완료}
              로그인완료변경={로그인완료변경}
            />
          }
        />
        <Route path="/detail/:id" element={<Detail hochony={hochony} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
