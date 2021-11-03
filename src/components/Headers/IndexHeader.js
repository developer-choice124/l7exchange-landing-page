
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

import HeaderImg from "../../assets/img/joshua-stannard.jpg";
// import overImg from "../../assets/img/clouds.png";
import { BackendApi } from "config/config";

// core components

function IndexHeader() {
  // api call for fetch the data for banner list
  const url = `${BackendApi}/banner`;
  const [imgOne, setimgOne] = React.useState([]);
  const [imgTwo, setimgTwo] = React.useState([]);
  const [imgThree, setimgThree] = React.useState([]);
  const getdata = async () => {
    const response = await fetch(url);
    const banner = await response.json();
    setimgOne(banner.data[0]);
    setimgTwo(banner.data[1]);
    setimgThree(banner.data[2]);
    return true;
  }

  React.useEffect(() => {
    getdata()
  }, [url])
 
  const BannerImgA = imgOne ? imgOne.image : HeaderImg;
  const BannerImgB = imgTwo ? imgTwo.image : HeaderImg;
  const BannerImgC = imgThree ? imgThree.image : HeaderImg;
  return (
    <>
      {/* <div
        className="page-header section-dark headerIndex"
        style={{
          backgroundImage:
            `url(${BannerImg})`,
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">L7-Exchange Cricket</h1>
            </div>
          </Container>
        </div>
        <div
          className="moving-clouds headerIndex overlay"
          style={{
            backgroundImage:
              `url(${overImg})`,
          }}
        />
      </div> */}

<div id="carouselExampleDark" className="carousel carousel-dark slide" id="index-header" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner carousel-wh">
    <div className="carousel-item active" data-bs-interval="3000">
      <img src={`${BannerImgA}`} className="d-block" id="img-position" alt="Banner Image"/>
    </div>
    <div className="carousel-item" data-bs-interval="3000">
      <img src={`${BannerImgB}`} className="d-block" id="img-positionA" alt="Banner Image"/>
    </div>
    <div className="carousel-item" data-bs-interval="3000">
      <img src={`${BannerImgC}`} className="d-block" id="img-positionB" alt="Banner Image"/>
    </div>
  </div>
</div>
    </>
  );
}
export default IndexHeader;