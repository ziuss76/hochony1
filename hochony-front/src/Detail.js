import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Nav, Container } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./Detail.css";
import { useDispatch } from "react-redux";
import { addItem } from "./store";

function Detail(props){
    let dispatch = useDispatch();

    let [alert, alert변경] = useState(true);
    let [누른탭, 누른탭변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);

    useEffect(() => {
        let 타이머 = setTimeout(() => {alert변경(false);}, 3000);
        return () => { 
          clearTimeout(타이머); //2초 전에 나갔을 때 버그 방지용, 이 전 타이머 꺼서 중첩 방지
        };
      }, []);

        // useEffect 안 콜백함수 안에는 컴포넌트가 첫 등장, 업데이트 시 실행할 것
        // return 안 함수는 컴포넌트가 사라질 때 실행할 것
        // 업데이트 되어도 실행 안되게 하는 법 끝에 [] 붙이기

    let navigate = useNavigate();
    let { id } = useParams(); // {id}는 :id 자리에 있던 숫자
    let 찾은상품 = props.hochony.find((상품) => 상품.id == id); // 상품.id 가 :id 자리의 숫자와 같은 상품을 찾아줌
    let [찾은상품개수, 찾은상품개수변경] = useState(찾은상품.quan)

    return (
      <><Container>
            <div className="mx-auto col-md-4">
              <img
                src={"https://ziuss76.github.io/images/hochony" + (찾은상품.id + 115) + ".jpg"
                }
                className="product" width="94%"
              />
            </div>
            
            <div className="product-box">
              <h4 className="pt-3">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}원</p>
              <p>재고: {찾은상품개수}</p>
    
              <button
               className = "buttonGreen"
               style={{width:'85px'}}
                onClick={() => {
                  찾은상품개수변경(()=>{
                    찾은상품.quan --;
                  })
                  dispatch(
                    addItem({ id: 찾은상품.id, name: 찾은상품.title, quan: 1})
                  );
                  navigate("/cart");
                }}
              >
                장바구니
              </button>
              <button
                className = "buttonOrange"
                style={{width:'85px'}}
                onClick={() => {
                  navigate(-1); //뒤로가기 1은 앞으로가기 2는 앞으로 2번 가기 등등
                }}
              >
                뒤로가기
              </button>
          </div>
          </Container>

          {alert === true ? (
        <div className="my-alert">
          <p>Almost Sold Out ! </p>
        </div>
      ) : null}

        <Container>
          <Nav className="mt-3" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
          className="mx-3"
            eventKey="link-0"
            onClick={() => {
              누른탭변경(0);
              스위치변경(false);
            }}
          >
            배송시작
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
            교환 / 환불
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
          className="mx-3"
            eventKey="link-2"
            onClick={() => {
              누른탭변경(2);
              스위치변경(false);
            }}
          >
            구매후기(265)
          </Nav.Link>
        </Nav.Item>
        
      </Nav>
      </Container>

      <CSSTransition in={스위치} className="pop" timeout={500}>
        <TabComponent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>

          </>
          )
};

function TabComponent(props) {
    useEffect(() => {
      props.스위치변경(true); //컴포넌트가 등장, 로드될 때 true로 변경
    });
    if (props.누른탭 === 0) {
      return <div className="detail-content">저녁8시이전 주문시 새벽배송!</div>;
    } else if (props.누른탭 === 1) {
      return <div className="detail-content">한번 간택 당하면 빠꾸 그런거 없습니다ㅅㄱ</div>;
    } else if (props.누른탭 === 2) {
      return <div className="detail-content">어마어마한 앙큼boy네요 <br/> 저 요염한 빵댕이 뚜들기러 가봐야돼서 그럼이만</div>;
    }
  }
  
  export default Detail;