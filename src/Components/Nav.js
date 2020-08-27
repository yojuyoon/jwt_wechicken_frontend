import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../src/Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useHistory, Link } from "react-router-dom";
import { SearchSvg } from "../../src/Styles/svg";
import ProfileIcon from "../Components/ProfileIcon";
import Login from "../Components/Login/Login";
import BtnTheme from "../Components/Buttons/BtnTheme";
import { useSelector } from "react-redux";
import { loginToken } from "../store/actions/loginAction";
import { useDispatch } from "react-redux";

const Nav = () => {
  const [isdropDownOpen, setDropDownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isModalOn, setModalOn] = useState(false);
  const history = useHistory();
  //redux
  const loginStatus = useSelector((state) => state.loginReducer);
  const profileImage = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();

  const handleSelected = (e) => {
    setSelectedMenu(e.target.innerText);
  };

  useEffect(() => {
    handleSelectedFunctions(selectedMenu);
    // eslint-disable-next-line
  }, [selectedMenu]);

  const handleSelectedFunctions = (selected) => {
    setDropDownOpen(false);
    if (selected === "로그아웃") {
      history.push("/");
      sessionStorage.removeItem("token");
      dispatch(loginToken(""));
      alert("로그아웃 되었습니다");
      window.location.reload();
    }
  };

  console.log(profileImage);

  return (
    <NavContainer onMouseLeave={() => setDropDownOpen(false)}>
      {isModalOn && <Login setModalOn={setModalOn} />}
      <LogoWrap>
        <Logo>
          <Link to="/">
            <img className="logoImage" alt="logo" src="/Images/logo.png" />
          </Link>
          <div className="logoText">>wechicken</div>
        </Logo>
        <NthTitle>10고 뜯고 10기 치킨계</NthTitle>
      </LogoWrap>
      {!loginStatus && (
        <NonUserWrap>
          <div className="searchIcon">{SearchSvg}</div>
          <div onClick={() => setModalOn(true)}>
            <BtnTheme value={"로그인"} />
          </div>
        </NonUserWrap>
      )}
      {loginStatus && (
        <UserWrap>
          <div className="searchIcon">{SearchSvg}</div>
          <FontAwesomeIcon className="bookmarkIcon" icon={faBookmark} />
          <FontAwesomeIcon className="heartIcon" icon={faHeart} />
          <div onMouseOver={() => setDropDownOpen(true)}>
            <ProfileIcon
              size={50}
              img={
                "https://miro.medium.com/fit/c/256/256/1*Mzkzg31wDXjEDVKYRqsLXw.jpeg"
              }
            />
          </div>
        </UserWrap>
      )}
      {isdropDownOpen && (
        <Dropdown selectedMenu={selectedMenu}>
          <li
            onClick={handleSelected}
            className={selectedMenu === "마이페이지" ? "focused" : undefined}
          >
            <Link to="/MyPage">마이페이지</Link>
          </li>
          <li
            onClick={handleSelected}
            className={selectedMenu === "전체 블로그" ? "focused" : undefined}
          >
            전체 블로그
          </li>
          <li
            onClick={handleSelected}
            className={
              selectedMenu === "내 기수 블로그" ? "focused" : undefined
            }
          >
            내 기수 블로그
          </li>
          <li
            onClick={handleSelected}
            className={selectedMenu === "로그아웃" ? "focused" : undefined}
          >
            로그아웃
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

  a {
    text-decoration: none;
    color: inherit;
  }
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

const NonUserWrap = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 120px;
  height: 47px;

  .searchIcon svg {
    width: 21px;
    height: 21px;
    margin-top: 5px;
    fill: ${theme.deepGrey};
  }
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
  right: 81px;
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
    cursor: pointer;

    &:hover {
      color: ${theme.orange};
      font-weight: 400;
    }
  }

  .focused {
    color: ${theme.orange};
    font-weight: 900;
  }
`;

export default Nav;
