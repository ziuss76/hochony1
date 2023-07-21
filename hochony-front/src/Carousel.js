import { Container, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function CarouselComponent() {
  return (
    <Container className="col-lg-10">
      <Carousel className="my-5 mx-3 Carousel">
        <Carousel.Item interval={1500}>
          <img className="d-block w-100" src="https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonybg1.webp" alt="First slide" />
          <Carousel.Caption>
            <h4>자, 이제 당신도 호집사</h4>
            <h6>젤리맛좀 볼테야?</h6>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100" src="https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonybg2.webp" alt="Second slide" />
          <Carousel.Caption>
            <h4>이 천사같은 모습</h4>
            <h6>그냥 지나칠 수 없지</h6>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src="https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonybg3.webp" alt="Third slide" />
          <Carousel.Caption>
            <h4>호천이님의</h4>
            <h6>앙큼한 귀여움을 팔아요</h6>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default CarouselComponent;