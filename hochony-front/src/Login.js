import { Container, Badge } from "react-bootstrap";
import React from "react";
import "./Button.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const handleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const accessToken = sessionStorage.getItem("accessToken");

  return (
    <>
      <Container className="col-md-4">
        <img src={"https://storage.googleapis.com/hochony/hochonylogin.webp"} className="product mt-3" width="94%" />
        <div className="product-box">{accessToken ? <h6>어이, 가는거냐.</h6> : <h6>어이, 로그인이나 해라.</h6>}</div>
        {accessToken ? (
          <button className="buttonPink mb-5" role="button" onClick={handleLogOut}>
            로그아웃
          </button>
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
