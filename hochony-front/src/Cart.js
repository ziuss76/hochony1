import { Table, Modal, Form, Container } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Button.scss";
import { addCount, subCount, clearItems, orderUp, clearOrders } from "./store";

function Cart() {
  let cartState = useSelector((state) => state.cart); // state 는 리덕스 전역 상태 객체
  let dispatch = useDispatch();

  return (
    <Container className="col-lg-6">
      <Table>
        <thead>
          <tr>
            {/* tr: 가로행   td,th: 세로행 */}
            <th>사진</th>
            <th>상품명</th>
            <th>내용</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {cartState.length === 0
            ? null
            : cartState.map((cartItem, i) => (
                <tr key={i}>
                  <td>{<img src={"https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonypic" + cartItem.id + ".webp"} width="75px" />}</td>
                  <td>{cartItem.title}</td>
                  <td>{cartItem.content}</td>
                  <td>{cartItem.quan}</td>
                  <td>
                    <div className="button-box">
                      <button
                        className="buttonOrange"
                        style={{ fontSize: "28px" }}
                        role="button"
                        onClick={() => {
                          dispatch(subCount(cartItem.id));
                        }}
                      >
                        -
                      </button>
                      <button
                        className="buttonGreen"
                        style={{ fontSize: "22px" }}
                        role="button"
                        onClick={() => {
                          dispatch(addCount(cartItem.id));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <주문하기></주문하기>
    </Container>
  );
}
function 주문하기() {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const addressRef = useRef(null);
  const phoneNumberRef = useRef(null);

  let cartState = useSelector((state) => state.cart);
  let orderState = useSelector((state) => state.order); // state 는 리덕스 전역 상태 객체
  let dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(address, phoneNumber);
  }, [address, phoneNumber]);

  const handleOrder = () => {
    const addressValue = addressRef.current.value;
    const phoneNumberValue = phoneNumberRef.current.value;

    setAddress(addressValue);
    setPhoneNumber(phoneNumberValue);

    const orderState = cartState.map((item) => ({
      ...item,
      address: addressValue,
      phoneNumber: phoneNumberValue,
    }));

    dispatch(orderUp(orderState));

    // dispatch로 세 값을 보내고 초기화
    setAddress("");
    setPhoneNumber("");
    dispatch(clearItems(cartState));

    handleClose();
  };

  return (
    <>
      <button className="buttonPink" role="button" onClick={handleShow}>
        주문하기
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>주소랑 번호 적으셈</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className="p-3" controlId="formGridAddress1">
            <Form.Label>주소</Form.Label>
            <Form.Control ref={addressRef} placeholder="호천로1번길 83 106동 301호" />
            <Form.Label className="mt-3">전화번호</Form.Label>
            <Form.Control ref={phoneNumberRef} placeholder="01012345678" />
          </Form.Group>
        </Form>
        <Modal.Body>호천이도 주소는 알아야 새벽배송을 가지;;😅</Modal.Body>
        <Modal.Footer>
          <button className="buttonGray" role="button" onClick={handleClose}>
            닫기
          </button>
          <button className="buttonPink" role="button" onClick={handleOrder}>
            배송
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;
