import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Button.scss";

function Card(props) {
  let navigate = useNavigate();
  return (
    <div className="col-md-4">
      <img
        className="product-img"
        onClick={() => {
          navigate("/detail/" + props.hochony.id);
        }}
        src={"https://storage.googleapis.com/hochony/hocho" + props.hochony.id + ".webp"}
        alt=""
        width="90%"
      />
      <div
        className="product-box"
        onClick={() => {
          navigate("/detail/" + props.hochony.id);
        }}
      >
        <h4 className="photoTitle">{props.hochony.title}</h4>
        <p>{props.hochony.content}</p>
        <p>
          {props.hochony.price} won / {props.hochony.quan} units
        </p>
      </div>
    </div>
  );
}

export default Card;
