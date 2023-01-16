import { Modal, Form, Container } from "react-bootstrap";
import React, { useState} from "react";
import "./Cart.scss";

function Login() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <><Container>
        <img src={"https://ziuss76.github.io/images/hochonylogin.jpg"} className="col-md-6 mt-3" width="94%"/>
        <div className="product-box">
            어이, 구글로그인으로 끝난 줄 알았나?<br></br>이것도 빨리 적어라.<br></br>그럼 특별히 막내로 받아주마.
        </div>
        </Container>
        <button className="buttonBlue mb-5" role="button" onClick={handleShow}>
          회원가입  
        </button>

  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>😼당신도 이제 호집사야😼</Modal.Title>
          </Modal.Header>
          <Form>
            <Form.Group className="m-3" controlId="formBasicEmail">
                <Form.Label>아이디</Form.Label>
                <Form.Control type="text" placeholder="영+숫 8자이상" name="id" />
                <Form.Text className="text-muted">
                    호집사의 개인정보는 호천이와도 공유하지 않습니다🤫
                </Form.Text>
            </Form.Group>

            <Form.Group className="m-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="영+숫 8자이상" name="pw"/>
            </Form.Group>
            <Form.Group className="m-3" controlId="formBasicPassword">
                <Form.Label>비밀번호확인</Form.Label>
                <Form.Control type="password" placeholder="영+숫 8자이상" />
            </Form.Group>
            <Form.Group className="m-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="호천아 날 기억해줘!" />
            </Form.Group>
            </Form>
          <Modal.Footer>
            <button className="buttonGray" role="button" onClick={handleClose}>
              닫기
            </button>
            <button className="buttonBlue" role="button" type="submit" onClick={handleClose}>
              가입
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Login;