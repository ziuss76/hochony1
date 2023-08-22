import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Button.scss";
import "./Detail.css";

function Card({ hochony }) {
  let navigate = useNavigate();
  const { id, title, content, price, quan } = hochony;

  return (
    <div className="col-lg-4">
      <img
        className="product-img"
        onClick={() => {
          navigate("/detail/" + id);
        }}
        src={
          id === 0
            ? require("./assets/hochonypic0.webp")
            : id === 1
            ? require("./assets/hochonypic1.webp")
            : id === 2
            ? require("./assets/hochonypic2.webp")
            : "https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonypic" + id + ".webp"
        }
        alt="이미지 로딩중.."
        width="500"
        height="500"
      />
      <div
        className="product-box"
        onClick={() => {
          navigate("/detail/" + id);
        }}
      >
        <h4 className="photoTitle">{title}</h4>
        <p>{content}</p>
        {price ? (
          <p>
            {price} won / {quan} units
          </p>
        ) : (
          <p>{quan} units</p>
        )}
      </div>
    </div>
  );
}

export default Card;
