import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import "./Detail.css";
import "./Button.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "./store";
import Tab from "./Tab";
import { Helmet } from "react-helmet-async";

function Detail() {
  const dispatch = useDispatch();
  const [alert, alert변경] = useState(true);
  const [누른탭, 누른탭변경] = useState(0);
  const [스위치, 스위치변경] = useState(false);
  const [userDetail, userDetail변경] = useState(null);
  const [찾은상품, 찾은상품변경] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/content/${id}`)
      .then((result) => {
        찾은상품변경(result.data);
        // console.log(result.data);
      })
      .catch(() => {
        console.log("불러오기 실패!");
      });
  }, []);

  useEffect(() => {
    const 유저디테일 = JSON.parse(sessionStorage.getItem("userDetail"));
    if (유저디테일 === null) {
      navigate("/login");
    } else {
      userDetail변경(유저디테일);
    }
  }, []);

  useEffect(() => {
    const 타이머 = setTimeout(() => {
      alert변경(false);
    }, 1300);
    return () => {
      clearTimeout(타이머); // 2초 전에 나갔을 때 버그 방지용, 이전 타이머 꺼서 중첩 방지
    };
  }, []);

  return (
    <Container className="col-lg-4">
      {찾은상품 && (
        <Helmet>
          <title>{`Hochony #${찾은상품.id}`}</title>
          <link rel="canonical" href={"https://port-0-hochony1-1jmcjt27lb8p5idq.gksl2.cloudtype.app" + "/detail/" + 찾은상품.id} />
          <meta name="title" content={`${찾은상품.title}`}></meta>
          <meta name="content" content={`${찾은상품.content}`}></meta>
        </Helmet>
      )}

      {찾은상품 && (
        <>
          <div className="mx-auto">
            <img
              alt="상품 이미지"
              src={
                찾은상품.id === 0
                  ? require("./assets/hochonypic0.webp")
                  : 찾은상품.id === 1
                  ? require("./assets/hochonypic1.webp")
                  : 찾은상품.id === 2
                  ? require("./assets/hochonypic2.webp")
                  : "https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonypic" + 찾은상품.id + ".webp"
              }
              className="product-img"
              width="500"
              height="500"
            />
          </div>

          {alert === true ? (
            <div className="my-alert">
              <p>Almost Sold Out ! </p>
            </div>
          ) : null}

          <div className="product-box">
            <h4 className="p-3">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>
              {찾은상품.price} won / {찾은상품.quan} units
            </p>

            <button
              className="buttonOrange"
              style={{ width: "85px" }}
              onClick={() => {
                navigate(-1); //뒤로가기 1은 앞으로가기 2는 앞으로 2번 가기
              }}
            >
              뒤로가기
            </button>
            <button
              className="buttonGreen"
              style={{ width: "85px" }}
              onClick={() => {
                dispatch(
                  addItem({
                    _id: 찾은상품._id,
                    id: 찾은상품.id,
                    title: 찾은상품.title,
                    content: 찾은상품.content,
                    quan: 1,
                  })
                );
                navigate("/cart");
              }}
            >
              장바구니
            </button>
          </div>
        </>
      )}

      <Nav className="mt-2" fill variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              누른탭변경(0);
              스위치변경(false);
            }}
          >
            구매후기
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              누른탭변경(1);
              스위치변경(false);
            }}
          >
            배송안내
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              누른탭변경(2);
              스위치변경(false);
            }}
          >
            교환/반품
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab 누른탭={누른탭} 스위치변경={스위치변경} id={id} userDetail={userDetail} />
    </Container>
  );
}

export default Detail;
