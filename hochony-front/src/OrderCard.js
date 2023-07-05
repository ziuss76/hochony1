import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Button.scss";

function OrderCard({ order }) {
  let navigate = useNavigate();
  const { id, title, content, quan, address, phoneNumber } = order;

  return (
    <div className="col-md-4">
      <img
        className="product-img"
        onClick={() => {
          navigate("/detail/" + id);
        }}
        src={"https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonypic" + id + ".webp"}
        alt=""
        width="90%"
      />
      <div
        className="product-box"
        onClick={() => {
          navigate("/detail/" + id);
        }}
      >
        <h4 className="photoTitle">{title}</h4>
        <p>{content}</p>
        <p>{quan}개의 상품</p>
        <p>{address}에 배송중⚡️</p>
        <p>{phoneNumber}로 문자할게요💌</p>
      </div>
    </div>
  );
}

export default OrderCard;
