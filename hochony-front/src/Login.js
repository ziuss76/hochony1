import { Container, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Button.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import OrderCard from "./OrderCard.js";
import { clearOrders } from "./store";

function Login() {
  const [userDetail, setUserDetail] = useState({});
  const accessToken = sessionStorage.getItem("accessToken");
  let dispatch = useDispatch();
  let orderState = useSelector((state) => state.order);

  const handleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  useEffect(() => {
    if (accessToken) {
      const userDetail = jwt_decode(accessToken);
      const { name, picture } = userDetail;
      setUserDetail({ name, picture });
    }
  }, []);

  return (
    <>
      {accessToken ? (
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
        <div className="product-box">{accessToken ? <h6>어이 {userDetail.name}, 가는 거냐.</h6> : <h6>어이, 로그인이나 해라.</h6>}</div>
        {accessToken ? (
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
                <GoogleLogin
                  text="signin_with"
                  shape="pill"
                  onSuccess={(res) => {
                    const accessToken = res.credential;
                    sessionStorage.setItem("accessToken", accessToken);
                    window.location.href = "/";
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default Login;
