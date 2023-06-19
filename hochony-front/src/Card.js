import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Button.scss";

function Card({ hochony }) {
  let navigate = useNavigate();
  const { id, title, content, price, quan } = hochony;

  return (
    <div className="col-md-4">
      <img
        className="product-img"
        onClick={() => {
          navigate("/detail/" + id);
        }}
        src={"https://storage.googleapis.com/hochony/hocho" + id + ".webp"}
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
        <p>
          {price} won / {quan} units
        </p>
      </div>
    </div>
  );
}

export default Card;
