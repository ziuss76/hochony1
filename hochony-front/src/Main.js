import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import { useState, useEffect, lazy, Suspense } from "react";
import Card from "./Card";
import Carousel from "./Carousel";
import "./Button.scss";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import dialogData from "./Data/dialogData";
const LazyDialog = lazy(() => import("./Dialog"));

function Main({ hochony, hochony변경, 구글로그인, 구글로그인변경, 로그인완료변경, 더보기, 더보기변경 }) {
  const [userName, setUserName] = useState("노네임");

  useEffect(() => {
    const userDetail = sessionStorage.getItem("userDetail");
    if (userDetail) {
      const parsedUserDetail = JSON.parse(userDetail);
      setUserName(parsedUserDetail.name);
    }
  }, [구글로그인]);

  useEffect(() => {
    if (더보기) {
      axios
        .get("/content")
        .then((result) => {
          hochony변경(result.data);
          더보기변경(false);
        })
        .catch(() => {
          console.log("불러오기 실패!");
        });
    }
  }, [더보기]);

  const handleGoogleLogin = async (res) => {
    try {
      const response = await axios.post("/login", { accessToken: res.credential });

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
      <Carousel />
      <div className="container">
        <div className="row">
          {hochony.map((a, i) => {
            return <Card hochony={hochony[i]} i={i} key={i} />; //hochony 중에 hochony[i] 만 전송한다
          })}
        </div>

        {구글로그인 === true && (
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
        {/* <Dialog /> */}
        {!구글로그인 && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyDialog userName={userName} dialogData={dialogData} />
          </Suspense>
        )}
      </div>
    </>
  );
}
export default Main;
