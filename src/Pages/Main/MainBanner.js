import React from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import theme from "../../Styles/Theme";
import { bannerContents } from "./MainBannerContents";

const MainBanner = ({ setActiveAlert }) => {
  const slideSettings = {
    dots: false,
    infinite: true,
    speed: 900,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const history = useHistory();

  return (
    <MainBannerContainer>
      <Slider {...slideSettings}>
        {bannerContents.map((content, i) => {
          return (
            <div className="bannerWrap" key={i}>
              <img className="bannerImg" alt="bannerImg" src={content.img} />
              <BannerContent>
                <h1 className="greeting">{content.title}</h1>
                <h2 className="title">{content.subtitle}</h2>
                <div className="text">
                  <p>{content.content}</p>
                </div>
                <button
                  onClick={() =>
                    content.id !== "siteIn"
                      ? window.location.assign(`${content.link}`)
                      : JSON.parse(sessionStorage.getItem("USER")) ? history.push(`${content.link}`) : setActiveAlert(true)
                  }
                  className="moreBtn"
                >
                  더보기 ▸
                </button>
              </BannerContent>
            </div>
          );
        })}
      </Slider>
    </MainBannerContainer>
  );
};

export default MainBanner;

const MainBannerContainer = styled.div`
  width: 90%;
  max-width: 1600px;

  @media (max-width: 800px) {
    display: none;
  }

  .slick-slide {
    .bannerWrap {
      display: flex !important;
      justify-content: center;
      outline: none;
    }
    img {
      width: 50%;
    }
  }
`;

const BannerContent = styled.div`
  width: 35%;
  padding: 10px 0 0 75px;
  display: flex;
  flex-direction: column;
  font-family: ${theme.fontTitle};
  font-weight: 600;

  .greeting {
    font-size: 39px;
    color: ${theme.orange};
  }

  .title {
    font-size: 35px;
  }

  p {
    margin-top: 140px;
    line-height: 30px;
    font-size: 20px;
    font-weight: 300;
    font-family: ${theme.fontContent};
  }

  .moreBtn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    border: none;
    outline: none;
    font-size: 17px;
    background-color: transparent;
    color: ${theme.orange};
    cursor: pointer;
  }
`;
