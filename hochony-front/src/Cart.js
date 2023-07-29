import { Table, Modal, Form, Container } from "react-bootstrap";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Button.scss";
import { addCount, subCount, clearItems, orderUp } from "./store";
import { Helmet } from "react-helmet-async";
import DaumPostcode from "react-daum-postcode";

function Cart() {
  let cartState = useSelector((state) => state.cart); // state 는 리덕스 전역 상태 객체
  let dispatch = useDispatch();

  return (
    <Container className="col-lg-6">
      <Helmet>
        <title>Hochony Cart</title>
        <link rel="canonical" href="https://hochony.com/cart" />
      </Helmet>
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
                  <td>{<img src={"https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonypic" + cartItem.id + ".webp"} width="75" height="75" />}</td>
                  <td>{cartItem.title}</td>
                  <td>{cartItem.content}</td>
                  <td>{cartItem.quan}</td>
                  <td>
                    <div className="button-box">
                      <button
                        className="buttonOrange"
                        style={{ fontSize: "26px", padding: "7px 12px" }}
                        role="button"
                        aria-label="buttonMinus"
                        onClick={() => {
                          dispatch(subCount(cartItem.id));
                        }}
                      >
                        -
                      </button>
                      <button
                        className="buttonGreen"
                        style={{ fontSize: "22px", padding: "7px 11px" }}
                        role="button"
                        aria-label="buttonPlus"
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
  const [addressDetail, setAddressDetail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const addressRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const addressDetailRef = useRef(null);

  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const phoneNumberPattern = /^010-[0-9]{4}-[0-9]{4}$/;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePhoneNumberChange = (event) => {
    // 입력된 핸드폰 번호에서 숫자만 남기기
    const phoneNumberValue = event.target.value.replace(/[^0-9]/g, "");
    // 하이픈(-) 추가
    const formattedPhoneNumber = phoneNumberValue.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleOrder = () => {
    const addressValue = addressRef.current.value;
    const phoneNumberValue = phoneNumberRef.current.value;
    const addressDetailValue = addressDetailRef.current.value;

    setAddress(addressValue);
    setAddressDetail(addressDetailValue);

    if (address === "") {
      setAddressError("주소를 검색해주세요!");
      return;
    }
    if (!phoneNumberPattern.test(phoneNumberValue)) {
      setPhoneNumberError("010-0000-0000 양식에 맞게 입력해주세요!");
      return;
    }
    setPhoneNumberError("");
    setPhoneNumber(phoneNumberValue);

    const orderState = cartState.map((item) => ({
      ...item,
      address: addressValue + " " + addressDetailValue,
      phoneNumber: phoneNumberValue,
    }));

    dispatch(orderUp(orderState));

    // dispatch로 보낸 뒤 세 값을 초기화
    setAddress("");
    setAddressDetail("");
    setPhoneNumber("");
    dispatch(clearItems(cartState));

    handleClose();
  };

  const onCompletePost = (data) => {
    setAddress(data.address);
    setAddressError("");
  };

  return (
    <>
      <button className="buttonPink" role="button" onClick={handleShow}>
        주문하기
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>주소와 번호를 알려주세요</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className="p-3" controlId="formGridAddress1">
            <DaumPostcode onComplete={onCompletePost} className="mb-2"></DaumPostcode>
            <Form.Label>주소</Form.Label>
            <Form.Control isInvalid={!!addressError} className="no-outline" ref={addressRef} value={address} defaultValue={""} placeholder="위 주소 검색창을 사용해주세요!" />
            <Form.Control.Feedback type="invalid">{addressError}</Form.Control.Feedback>
            <Form.Label className="mt-2">상세 주소(선택)</Form.Label>
            <Form.Control className="no-outline" ref={addressDetailRef} defaultValue={""} placeholder="106동 301호" />
            <Form.Label className="mt-2">전화번호</Form.Label>
            <Form.Control
              isInvalid={!!phoneNumberError}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="no-outline"
              ref={phoneNumberRef}
              defaultValue={""}
              placeholder="01012345678"
            />
            <Form.Control.Feedback type="invalid">{phoneNumberError}</Form.Control.Feedback>
          </Form.Group>
        </Form>
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
