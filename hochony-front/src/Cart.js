import { Table, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.scss";
import { addCount, subCount } from "./store";

function Cart() {

  let state = useSelector((state) => state )
  let dispatch = useDispatch()
  let cartState = localStorage.getItem('cartState');
  let cartStateArray = JSON.parse(cartState) || [];
  
    return (
      <>
      <Table responsive>
      <thead>
        <tr>{/* tr: 가로행   td,th: 세로행 */}
          <th>사진</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        </thead>
        <tbody>
        {
        cartStateArray[0] === null ? null : cartStateArray.map((a,i)=> //왜 없던 널값이 갑자기 생겨서 화면이 하얗게 변할까?
                <tr key={i}>
                <td>{<img src={"https://ziuss76.github.io/images/hochony" + (a.id + 115) + ".jpg"} width="75px"/>}</td>
                  <td>{ a.name }</td>
                  <td>{ a.quan }</td>
                  <td><button className="buttonOrange" role="button" onClick={
                   ()=>{dispatch(addCount(a.id))}}>+1</button>
                <button className="buttonGreen" role="button" onClick={
                      ()=>{dispatch(subCount(a.id))}}>-1</button>
                </td>
                </tr>
                )
            }
        </tbody>
      </Table>
      <주문하기></주문하기>
    </>
    )
}
function 주문하기() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <button className="buttonBlue" role="button" onClick={handleShow}>
          주문하기
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>주소랑 번호 적으셈</Modal.Title>
          </Modal.Header>
    <Form>
        <Form.Group className="p-3" controlId="formGridAddress1">
        <Form.Label>주소</Form.Label>
        <Form.Control placeholder="호천로1번길 83 106동 301호"/>
        <Form.Label className="mt-3">전화번호</Form.Label>
        <Form.Control placeholder="0101234567"/>
        </Form.Group>
    </Form>
        <Modal.Body>호천이도 주소는 알아야 새벽배송을 가지;;😅
        </Modal.Body>
          <Modal.Footer>
            <button className="buttonGray" role="button" onClick={handleClose}>
              닫기
            </button>
            <button className="buttonBlue" role="button" onClick={handleClose}>
              배송
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default Cart; 