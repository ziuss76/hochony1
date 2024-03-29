import { useEffect, useState } from "react";
import { Container, InputGroup, Form, Modal, Card } from "react-bootstrap";
import "./Detail.css";
import "./Button.scss";
import axios from "axios";
import { Rating } from "react-simple-star-rating";

function Tab({ 누른탭, 스위치변경, id, userDetail }) {
  const [show, setShow] = useState(false);
  const [modalKind, modalKind변경] = useState("");
  const [modalTitle, modalTitle변경] = useState("");
  const [modalBody, modalBody변경] = useState("");
  const [수정중id, 수정중id변경] = useState(0);
  const [삭제할것, 삭제할것변경] = useState({});
  const [리뷰, 리뷰변경] = useState("");
  const [서버리뷰, 서버리뷰변경] = useState([]);
  const [별점, 별점변경] = useState(0);

  useEffect(() => {
    스위치변경(true);
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      const result = await axios.get(`/getReview/${id}`);
      서버리뷰변경([...result.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleConfirm = async () => {
    try {
      if (modalKind === "수정") {
        const result = await axios.put("/putReview", [수정중id, 별점, 리뷰]);
        // console.log(result);
      } else if (modalKind === "삭제") {
        const result = await axios.delete("/deleteReview", 삭제할것);
        // console.log(result);
      } else {
        const result = await axios.post(`/postReview/${id}`, [별점, 리뷰, userDetail.name]);
        // console.log(result);
      }
      await fetchReview();
      handleClose();
    } catch (error) {
      console.log("실패");
    }
  };

  const handleRating = (rate) => {
    별점변경(rate);
  };

  if (누른탭 === 0) {
    return (
      <>
        <div className="product-box">
          <Rating onClick={handleRating} rating={별점} />
          <InputGroup
            className="mt-1"
            onChange={(e) => {
              e.preventDefault();
              리뷰변경(e.target.value);
            }}
          >
            <Form.Control className="m-3" as="textarea" rows={6} placeholder="어떤 점이 귀여웠나요? 별점과 함께 10자 이상 작성해주세요!" />
          </InputGroup>
          <button
            className="buttonPink mb-2"
            role="button"
            aria-label="buttonSubmit"
            type="submit"
            onClick={() => {
              setShow(true);
              modalKind변경("제출");
              modalTitle변경("호천이가 당신의 리뷰를 고마워합니다!");
              modalBody변경("고맙다 휴먼, 너에게 내 총애를 선사하지!😼");
            }}
          >
            제출하기
          </button>
        </div>

        {서버리뷰.length > 0 &&
          서버리뷰.map((a, i) => {
            const isCurrentUserReview = userDetail?.name === 서버리뷰[i].유저네임;
            return (
              <div className="product-box p-4 m-1">
                <Rating size={30} initialValue={서버리뷰[i].점수} readonly={true} />
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>{i + 1} 번째 리뷰</Card.Title>
                    <Card.Text>{서버리뷰[i].내용}</Card.Text>
                  </Card.Body>
                </Card>
                {isCurrentUserReview && (
                  <button
                    className="buttonRed mt-3"
                    style={{ width: "85px" }}
                    type="submit"
                    role="button"
                    aria-label="buttonDelete"
                    onClick={() => {
                      setShow(true);
                      삭제할것변경({ data: 서버리뷰[i] });
                      modalKind변경("삭제");
                      modalTitle변경("호천이가 삭제를 허락했습니다!");
                      modalBody변경("이봐 휴먼, 다음엔 더 잘 써주라구😼");
                    }}
                  >
                    삭제하기
                  </button>
                )}

                {isCurrentUserReview && (
                  <button
                    className="buttonGreen mt-3"
                    style={{ width: "85px" }}
                    type="submit"
                    role="button"
                    aria-label="buttonChange"
                    onClick={() => {
                      setShow(true);
                      수정중id변경(서버리뷰[i]._id);
                      modalKind변경("수정");
                      modalTitle변경("호천이가 수정을 허락했습니다!");
                      modalBody변경(
                        <Container>
                          <Rating onClick={handleRating} rating={별점} />
                          <InputGroup
                            className="mt-1"
                            onChange={(e) => {
                              e.preventDefault();
                              리뷰변경(e.target.value);
                            }}
                          >
                            <Form.Control as="textarea" rows={6} placeholder="수정할 내용으로 적어주세요!" />
                          </InputGroup>
                        </Container>
                      );
                    }}
                  >
                    수정하기
                  </button>
                )}
              </div>
            );
          })}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <button className="buttonPink" role="button" aria-label="buttonConfirm" onClick={handleConfirm}>
              완료하기
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else if (누른탭 === 1) {
    return (
      <>
        <div className="product-box">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  aria-label="buttonShipChange"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  배송지를 변경하고 싶어요.
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p>주문 내역에서 배송지 수정을 눌러 주세요.</p>
                  <p>홈페이지 마이페이지 내의 주문 내역에서</p>
                  <p>배송지 수정을 눌러주시면 변경 가능합니다.</p>
                  <p>다만, 발주가 시작하지 않은 결제완료 상태의 주문만</p>
                  <p>홈페이지에서 배송지 수정이 가능합니다.</p>
                  <p>변경이 어려운 경우, 고객센터로 문의주시면</p>
                  <p>확인 후 안내 도와드리겠습니다.</p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  aria-label="buttonShipStart"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  언제 배송이 시작되나요?
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p>평일 낮 12시 이전까지 주문해주시면</p>
                  <p>빠르게 받으실 수 있어요.</p>
                  <p>평일 낮 12시 이전 주문은 당일 출고입니다.</p>
                  <p>낮 12시 이후 결제건은 익일 출고입니다.</p>
                  <p>주말과 공휴일에 주문한 경우, 영업일 출고입니다.</p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  aria-label="buttonWhichShip"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  어떤 택배사로 배송되나요?
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p>모든 제품은 Hochony Delivery를 통해 배송됩니다.</p>
                  <p>배송불가 지역의 경우, 분류해 타 택배사로 출고를 요청하니</p>
                  <p>배송이 다소 지연되는 점 너른 양해 바랍니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (누른탭 === 2) {
    return (
      <>
        <div className="product-box">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  aria-label="buttonRefund"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  상품을 교환/반품하고 싶어요.
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p>호천님의 귀여움은 한번 간택당하면</p>
                  <p>그 이전의 삶으로 영영 돌아갈 수 없습니다만</p>
                  <p>호천님의 넓은 아량으로, 단순 변심에 의한 환불은</p>
                  <p>제품 수령 후 14일 이내까지 가능합니다.</p>
                  <p>그러나 이 때, 왕복 배송비 5,000원이 발생됩니다.</p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  aria-label="buttonCancel"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  접수한 교환/반품을 취소하고 싶어요.
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p>교환/반품 접수 후 취소를 원하실 경우</p>
                  <p>마이페이지 주문내역에서 신청해주세요.</p>
                  <p>홈페이지 신청이 어려우신 경우</p>
                  <p>고객센터로 연락 주시면 확인 후 취소 도와드리겠습니다.</p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  aria-label="buttonWhenRefund"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  반품/취소했는데 금액은 언제 환불되나요?
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p>반품 완료 후 영업일 기준 5일 내로 환불이 완료됩니다.</p>
                  <p>반품 접수 완료 이후, 영업일 기준 1~3일 정도 소요됩니다.</p>
                  <p>다만, 카드사 및 결제사의 사정에 따라</p>
                  <p>1~2일 정도 더 소요될 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tab;
