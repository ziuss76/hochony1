import { Container, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Button.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import OrderCard from "./OrderCard.js";
import { clearOrders } from "./store";
import axios from "axios";

function Login() {
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail") || null);
  let dispatch = useDispatch();
  let orderState = useSelector((state) => state.order);

  const handleLogOut = () => {
    sessionStorage.removeItem("userDetail");
    window.location.href = "/";
  };

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
        window.location.href = "/";
      } else {
        console.log("Invalid response from server");
      }
    } catch (error) {
      console.log("Login Failed", error);
    }
  };

  return (
    <>
      {userDetail ? (
        <>
          <div className="product-box">
            {orderState.length !== 0 ? (
              <div className="center">
                <img src={userDetail.picture} style={{ width: "30px", marginRight: "15px" }} />
                <h5 style={{ margin: 0 }}>{userDetail.name}님의 구매내역이에요!</h5>
              </div>
            ) : (
              <div className="center">
                <img src={userDetail.picture} style={{ width: "30px", marginRight: "15px" }} />
                <h5 style={{ margin: 0 }}>{userDetail.name}님의 구매내역이 비었어요! </h5>
              </div>
            )}
          </div>

          <div className="container">
            <div className="row">
              {orderState.map((order, i) => {
                return <OrderCard order={order} key={i} />;
              })}
            </div>
          </div>
        </>
      ) : null}

      <Container className="col-lg-4">
        <img src={"https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonylogin.webp"} className="product mt-3" width="94%" />
        <div className="product-box">{userDetail ? <h6>어이 {userDetail.name}, 가는 거냐.</h6> : <h6>어이, 로그인이나 해라.</h6>}</div>
        {userDetail ? (
          <>
            <button className="buttonPink mb-5" role="button" onClick={handleLogOut}>
              로그아웃
            </button>
            <button className="buttonGray mb-5" role="button" onClick={() => dispatch(clearOrders(orderState))}>
              내역삭제
            </button>
          </>
        ) : (
          <>
            <div className="googleText">
              <Badge pill bg="light" text="dark">
                구글 로그인 하고 더보기!
              </Badge>
            </div>
            <div className="googleBox">
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin text="signin_with" shape="pill" onSuccess={handleGoogleLogin} />
              </GoogleOAuthProvider>
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default Login;
