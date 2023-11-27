import { Container, Badge } from "react-bootstrap";
import "./Button.scss";
import "./Detail.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import OrderCard from "./OrderCard";
import { clearOrders } from "./store";
import axios from "axios";
import { Helmet } from "react-helmet-async";

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
      const response = await axios.post("/login", { accessToken: res.credential });

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
      <Helmet>
        <title>Hochony Login</title>
        <link rel="canonical" href="https://port-0-hochony1-1jmcjt27lb8p5idq.gksl2.cloudtype.app/login" />
      </Helmet>
      {userDetail ? (
        <>
          <div className="product-box">
            {orderState.length !== 0 ? (
              <div className="center">
                <img alt="구매내역" src={userDetail.picture} style={{ width: "30px", marginRight: "15px" }} />
                <h5 style={{ margin: 0 }}>{userDetail.name}님의 구매내역이에요!</h5>
              </div>
            ) : (
              <div className="center">
                <img alt="빈 구매내역" src={userDetail.picture} style={{ width: "30px", marginRight: "15px" }} />
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
        <img alt="거만 호천" src={require("./assets/hochonylogin.webp")} className="product-img mt-3" width="500" height="500" />
        <div className="product-box">{userDetail ? <h6>어이 {userDetail.name}, 가는 거냐.</h6> : <h6>어이, 로그인이나 해라.</h6>}</div>
        {userDetail ? (
          <>
            <button className="buttonPink mb-5" role="button" aria-label="buttonLogOut" onClick={handleLogOut}>
              로그아웃
            </button>
            <button className="buttonGray mb-5" role="button" aria-label="buttonDelete" onClick={() => dispatch(clearOrders(orderState))}>
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
