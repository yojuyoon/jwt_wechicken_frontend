import React, { useState } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../src/Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { SearchSvg } from "../../src/Styles/svg";
import ProfileIcon from "../Components/ProfileIcon";

const Nav = () => {
  const [isdropDownOpen, setDropDownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleSelected = (e) => {
    setSelectedMenu(e.target.innerText);
  };

  return (
    <NavContainer onMouseLeave={() => setDropDownOpen(false)}>
      <LogoWrap>
        <Logo>
          <img
            className="logoImage"
            alt="logo"
            src="/Images/logo.png"
            onMouseOver={() => setDropDownOpen(true)}
          ></img>
          <div className="logoText">>wechicken</div>
        </Logo>
        <NthTitle>10고 뜯고 10기 치킨계</NthTitle>
      </LogoWrap>
      <UserWrap>
        <div className="searchIcon">{SearchSvg}</div>
        <FontAwesomeIcon className="bookmarkIcon" icon={faBookmark} />
        <FontAwesomeIcon className="heartIcon" icon={faHeart} />
        <ProfileIcon
          size={50}
          img={
            "https://miro.medium.com/fit/c/256/256/1*Mzkzg31wDXjEDVKYRqsLXw.jpeg"
          }
        />
      </UserWrap>
      {isdropDownOpen && (
        <Dropdown selectedMenu={selectedMenu}>
          <li
            onClick={handleSelected}
            className={selectedMenu === "전체 블로그" && "focused"}
          >
            전체 블로그
          </li>
          <li
            onClick={handleSelected}
            className={selectedMenu === "내 기수 블로그" && "focused"}
          >
            내 기수 블로그
          </li>
          <li
            onClick={handleSelected}
            className={selectedMenu === "자유게시판" && "focused"}
          >
            자유게시판
          </li>
          <li
            onClick={handleSelected}
            className={selectedMenu === "마이페이지" && "focused"}
          >
            마이페이지
          </li>
        </Dropdown>
      )}
    </NavContainer>
  );
};

const NavContainer = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 111px;
  padding: 0 81px;
  background-color: ${theme.white};
  z-index: 1;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  width: 422px;
  height: 52px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 190px;

  .logoImage {
    width: 51px;
    height: 52px;
    margin-right: 10px;
    border-radius: 50px;
  }

  .logoText {
    width: 130px;
    font-family: ${theme.fontTitle};
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    color: #2d2b2b;
  }
`;

const NthTitle = styled.div`
  font-family: ${theme.fontTitle};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: ${theme.orange};
`;

const UserWrap = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 162px;
  height: 47px;

  .searchIcon svg {
    width: 21px;
    height: 21px;
    margin-top: 5px;
    fill: ${theme.deepGrey};
  }

  .bookmarkIcon {
    width: 21px;
    height: 21px;
    color: ${theme.deepGrey};
  }

  .heartIcon {
    width: 21px;
    height: 21px;
    color: ${theme.deepGrey};
  }
`;

const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px 0px;
  position: absolute;
  width: 216px;
  height: 208px;
  left: 81px;
  top: 111px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  li {
    ${flexCenter}
    justify-content: flex-start;
    height: 48px;
    padding: 16px 12px;
    font-family: ${theme.fontContent};
    font-style: normal;
    font-size: 16px;
    line-height: 24px;

    &:hover {
      /* color: ${theme.orange}; */
      font-weight: 900;
    }
  }

  .focused {
    color: ${theme.orange};
  }
`;

export default Nav;
