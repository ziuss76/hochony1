import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Form, InputGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import Data from "./Data/firstHochoData";
import "./Button.scss";
import axios from "axios";
import ScrollTop from "./ScrollTop";
import { Helmet } from "react-helmet-async";

const Main = lazy(() => import("./Main"));
const Detail = lazy(() => import("./Detail"));
const Cart = lazy(() => import("./Cart"));
const Login = lazy(() => import("./Login"));

function App() {
  const [hochony, hochony변경] = useState(Data); //Data는 data.js 에 있는 데이터 전체
  const [검색, 검색변경] = useState("");
  const [더보기, 더보기변경] = useState(false);
  const [구글로그인, 구글로그인변경] = useState(true);
  const [로그인완료, 로그인완료변경] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const scrollingRef = useRef();

  useEffect(() => {
    const userDetail = sessionStorage.getItem("userDetail");
    if (!userDetail) {
      로그인완료변경(false);
      구글로그인변경(true);
      더보기변경(false);
    } else {
      로그인완료변경(true);
      구글로그인변경(false);
      더보기변경(true);
    }
  }, []);

  useEffect(() => {
    let 스크롤초기값 = window.scrollY;

    const handleScroll = () => {
      const 스크롤바뀐값 = window.scrollY;
      const 변화지점 = window.innerHeight * 0.5;
      const Navbar높이 = 60;

      if (스크롤바뀐값 > 스크롤초기값 && 스크롤바뀐값 > 변화지점 + Navbar높이) {
        setShowNavbar(false);
      } else if (스크롤바뀐값 < 스크롤초기값 && 스크롤바뀐값 <= 변화지점) {
        setShowNavbar(true);
      }
      스크롤초기값 = 스크롤바뀐값;
    };
    scrollingRef.current = handleScroll;
    window.addEventListener("scroll", scrollingRef.current);

    return () => {
      window.removeEventListener("scroll", scrollingRef.current);
    };
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Hochony Shop</title>
        <link rel="canonical" href="https://hochony.com" />
      </Helmet>
      <Navbar sticky="top" bg="light" variant="light" className={`navbar ${!showNavbar ? "slide-up" : "slide-down"}`}>
        <Container fluid>
          <Nav.Link as={Link} to="/" aria-label="Home Page">
            <img alt="호처니아이콘" src={require("./assets/hochoicon.png")} width="35px" height="35px" className="hochoicon" />
          </Nav.Link>
          <Container className="col-lg-4">
            <InputGroup className="ms-4">
              <Form.Control
                placeholder="Hochony Shop"
                className="no-outline"
                name="searchInput"
                onChange={(e) => {
                  e.preventDefault();
                  검색변경(e.target.value);
                }}
              />
              <button
                type="search"
                className="me-1 buttonSearch"
                size="sm"
                role="button"
                style={{ width: "3rem" }}
                aria-label="buttonSearch"
                onClick={() => {
                  axios
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
              <Nav.Link as={Link} to="/cart" aria-label="Cart Page">
                <FontAwesomeIcon icon={faCartPlus} className="nav-icon cart-icon" />
              </Nav.Link>
              <Nav.Link as={Link} to="/login" aria-label="Login Page">
                <FontAwesomeIcon icon={faUser} className="nav-icon login-icon" />
              </Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>

      {/* Switch 쓰면 하나하나 exact 안 붙여도 됨! 6버전 이후로 Switch => Routes */}
      <ScrollTop />
      <Suspense
        fallback={
          <div className="loading-spinner">
            <Spinner animation="border" />
          </div>
        }
      >
        <Routes>
          <Route
            exact
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
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
