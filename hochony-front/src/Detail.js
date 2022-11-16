import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Nav, Container, InputGroup, Form, Modal, Card} from "react-bootstrap";
import "./Detail.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "./store";
import axios from "axios";
import { Rating } from 'react-simple-star-rating'


function Detail(props){
    let dispatch = useDispatch();
    let state = useSelector((state) => state)

    let [alert, alert변경] = useState(true);
    let [누른탭, 누른탭변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);

    useEffect(() => {
        let 타이머 = setTimeout(() => {alert변경(false);}, 1300);
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

    return (
      <><Container className="col-md-4">
            <div className="mx-auto">
              <img
                src={"https://ziuss76.github.io/images/hochony" + (찾은상품.id + 115) + ".jpg"
                }
                className="product" width="94%"
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
              <p>{찾은상품.price}원</p>
              <p>재고: {찾은상품.quan}</p>
    
              <button
               className = "buttonGreen"
               style={{width:'85px'}}
                onClick={() => {
                    dispatch(
                      addItem({_id: 찾은상품._id, id: 찾은상품.id, name: 찾은상품.title, quan: 1})
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

        <Container className="col-md-6">
          <Nav className="mt-2" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              누른탭변경(0);
              스위치변경(false);
            }}
          >
            구매후기(26)
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
            교환 / 환불
          </Nav.Link>
        </Nav.Item>
        
      </Nav>
      </Container>
        <TabComponent 누른탭={누른탭} 스위치변경={스위치변경}/>
          </>
          )
};

function TabComponent(props) {

    const [리뷰, 리뷰변경] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [rating, setRating] = useState(0) // initial rating value
    const handleRating = (rate) => {
    setRating(rate)
  }
    const [서버리뷰, 서버리뷰변경] = useState([]);

    useEffect(() => {
      props.스위치변경(true); //컴포넌트가 등장, 로드될 때 true로 변경
    });

    useEffect(() => {
      axios.get("/getReview").then((result) => {
        서버리뷰변경([...result.data]);
        console.log(서버리뷰);
      })
    }, []);


    if (props.누른탭 === 0) {
      return <Container className="col-md-8">
        <div className="product-box">
        <Rating onClick={handleRating} rating={rating}/>
        <InputGroup className="mt-1" 
        onChange={(e)=>{
          e.preventDefault();
          리뷰변경(e.target.value)}}>
        <Form.Control className="m-3" as="textarea" rows={6} 
        placeholder="어떤 점이 귀여웠나요? 별점과 함께 10자 이상 작성해주세요!" />
      </InputGroup>
      <button className="buttonBlue mb-2" role="button" type="submit"
       onClick={
        () => {
        axios.post("/review", [rating, 리뷰]).then((결과)=>console.log(결과)).catch(()=>console.log([rating, 리뷰]))
        
        setShow(true);
      }}
      >제출하기</button>
      </div>


      {서버리뷰.map((a,i)=>{ return <div className="product-box p-4 m-1">
        <Rating size={30} initialValue={서버리뷰[i].점수} readonly={true}
        />
        <Card className="mt-3">
      <Card.Body>
        <Card.Title>{i + 1} 번째 리뷰</Card.Title>
        <Card.Text>
          {서버리뷰[i].내용}
        </Card.Text>
      </Card.Body>
    </Card>
        </div>})}
        

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>호천이가 당신의 리뷰를 고마워합니다!</Modal.Title>
          </Modal.Header>
          <Modal.Body>고맙다 휴먼, 너에게 내 총애를 선사하지!😼</Modal.Body>
          <Modal.Footer>
            <button className="buttonGray" role="button" onClick={handleClose}>
              닫기
            </button>
          </Modal.Footer>
        </Modal>
        
        </Container>

    } else if (props.누른탭 === 1) {
      return <Container className="col-md-8"><div className="product-box">
      <div class="accordion accordion-flush" id="accordionFlushExample">
<div class="accordion-item">
  <h2 class="accordion-header" id="flush-headingOne">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      배송지를 변경하고 싶어요.
    </button>
  </h2>
  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">
      <h5>주문 내역에서 배송지 수정을 눌러 주세요! (기본배송지 X)</h5><br></br>
          <p>홈페이지 마이페이지 내의 주문 내역에서 배송지 수정을 눌러주시면 변경 가능합니다.</p>
          <p>다만, 발주가 시작하지 않은 결제완료 상태의 주문만 홈페이지에서 배송지 수정이 가능합니다.</p>
          <p>변경이 어려운 경우, 고객센터로 문의주시면 확인 후 안내 도와드리겠습니다.</p>
        </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="flush-headingTwo">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      언제 배송이 시작되나요?
    </button>
  </h2>
  <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">
      <h5>평일 낮 12시 이전까지 주문해주시면 빠르게 받으실 수 있어요!</h5><br></br>
          <p>평일 낮 12시 이전 주문 해주시면 당일 출고가 시작 됩니다.</p>
          <p>낮 12시 이후 결제건은 익일 출고가 시작됩니다.</p>
          <p>주말과 공휴일에 주문한 경우, 영업일이 시작하면 출고가 시작됩니다.</p>
        </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="flush-headingThree">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      어떤 택배사로 배송되나요?
    </button>
  </h2>
  <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">
    <h5>Hochony Shop 제품은 HD(호천이딜리버리)를 통해 배송됩니다.</h5><br></br>
          <p>배송불가 지역인 경우 분류작업 후 타 택배사로 출고를 요청하고 있습니다만,</p>
          <p>배송이 다소 지연되는 점 너른 양해 바랍니다.</p>
    </div>
  </div>
</div>
</div>
    </div></Container>
    } else if (props.누른탭 === 2) {
      return <Container className="col-md-8"><div className="product-box">
      <div class="accordion accordion-flush" id="accordionFlushExample">
<div class="accordion-item">
  <h2 class="accordion-header" id="flush-headingOne">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
    상품을 교환/반품하고 싶어요.
    </button>
  </h2>
  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">
      <h5>호천님의 귀여움은 한번 간택당하면 빠꾸 없는 게 국룰입니다만,</h5><br></br>
          <p>호천님의 넓은 아량으로, 단순 변심에 의한 환불은 제품 수령 후 14일 이내까지 가능합니다.</p>
          <p>단, 단순 변심으로 인한 반품 및 교환시 왕복 배송비 5,000원이 발생됩니다.</p>
          <p>제품이 훼손되어 상품가치가 상실된 경우에는 교환/반품이 불가능합니다.</p>
        </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="flush-headingTwo">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
    접수한 교환/반품을 취소하고 싶어요.
    </button>
  </h2>
  <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">
      <h5>홈페이지에서 접수하거나, 고객센터로 연락주세요.</h5><br></br>
          <p>교환/반품 접수 후 취소를 원하실 경우, 마이페이지 주문내역에서 신청해주세요.</p>
          <p>홈페이지 신청이 어려우신 경우, 고객센터로 연락 주시면 확인 후 취소 도와드리겠습니다.</p>
          
        </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="flush-headingThree">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
    반품/취소했는데 금액은 언제 환불되나요?
    </button>
  </h2>
  <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">
    <h5>반품 완료 후 영업일 기준 5일 내로 환불이 완료됩니다.</h5><br></br>
          <p>반품 접수 완료 이후, 통상적으로 영업일 기준 1~3일 정도 소요됩니다.</p>
          <p>다만, 카드사 및 결제사의 사정에 따라 1~2일 정도 추가로 소요될 수 있습니다.</p>
    </div>
  </div>
</div>
</div>
    </div>
    </Container>
    }
  }
  
  export default Detail;