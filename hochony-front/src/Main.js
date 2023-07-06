import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Carousel, Badge } from "react-bootstrap";
import React, { useEffect } from "react";
import Card from "./Card.js";
import "./Button.scss";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

function Main({ hochony, hochony변경, 구글로그인, 구글로그인변경, 로그인완료변경, 더보기, 더보기변경 }) {
  useEffect(() => {
    if (더보기) {
      axios
        .get("/content")
        .then((result) => {
          // console.log(result.data);
          hochony변경([...result.data.sort((a, b) => a.id - b.id)]);
          더보기변경(false);
        })
        .catch(() => {
          console.log("불러오기 실패!");
        });
    }
  }, [더보기]);

  const handleGoogleLogin = async (res) => {
    try {
      const accessToken = res.credential;
      // 액세스 토큰을 서버로 전송
      const response = await axios.post("/login", { accessToken });

      if (response.data.name && response.data.picture) {
        const userDetail = {
          name: response.data.name,
          picture: response.data.picture,
        };
        sessionStorage.setItem("userDetail", JSON.stringify(userDetail));
        로그인완료변경(true);
        구글로그인변경(false);
        더보기변경(true);
      } else {
        console.log("Invalid response from server");
      }
    } catch (error) {
      console.log("Login Failed", error);
    }
  };

  return (
    <>
      <Container className="col-lg-10">
        <Carousel className="my-5 mx-3 Carousel">
          <Carousel.Item interval={1500}>
            <img className="d-block w-100" src="https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonybg1.webp" alt="First slide" />
            <Carousel.Caption>
              <h4>자, 이제 당신도 호집사</h4>
              <h6>젤리맛좀 볼테야?</h6>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img className="d-block w-100" src="https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonybg2.webp" alt="Second slide" />
            <Carousel.Caption>
              <h4>이 천사같은 모습</h4>
              <h6>그냥 지나칠 수 없지</h6>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img className="d-block w-100" src="https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonybg3.webp" alt="Third slide" />
            <Carousel.Caption>
              <h4>호천이님의</h4>
              <h6>앙큼한 귀여움을 팔아요</h6>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <div className="container">
        <div className="row">
          {hochony.map((a, i) => {
            return <Card hochony={hochony[i]} i={i} key={i} />; //hochony 중에 hochony[i] 만 전송한다
          })}
        </div>
        {구글로그인 === true ? (
          <div className="googleText">
            <Badge pill bg="light" text="dark">
              구글 로그인 하고 더보기!
            </Badge>
          </div>
        ) : null}
        {구글로그인 === true ? (
          <div className="googleBox">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin text="signin_with" shape="pill" onSuccess={handleGoogleLogin} />
            </GoogleOAuthProvider>
          </div>
        ) : null}

        {/* {더보기 === true ? (
          <button
            className="buttonYellow"
            style={{ width: 85 }}
            onClick={() => {
              axios
                .get("/content")
                .then((result) => {
                  console.log(result.data);
                  hochony변경([...result.data.sort((a, b) => a.id - b.id)]);
                  더보기변경(false);
                })
                .catch(() => {
                  console.log("불러오기 실패!");
                });
            }}
          >
            더보기
          </button>
        ) : null} */}
      </div>
    </>
  );
}

export default Main;
