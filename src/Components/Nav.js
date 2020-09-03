import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../src/Styles/Theme";
import { useHistory, Link } from "react-router-dom";
import { SearchSvg } from "../../src/Styles/svg";
import ProfileIcon from "../Components/ProfileIcon";
import Login from "../Components/Login/Login";
import BtnTheme from "../Components/Buttons/BtnTheme";
import { useDispatch, useSelector } from "react-redux";
import { loginToken } from "../store/actions/loginAction";
import CreateMyGroup from "../Pages/MyGroup/CreateMyGroup/CreateMyGroup";

const Nav = () => {
  const [isdropDownOpen, setDropDownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isModalOn, setModalOn] = useState(false);
  const [isCreateMyGroupModalOn, setCreateMyGroupModalOn] = useState(false);
  const history = useHistory();
  //redux
  const loginStatus = useSelector((state) => state.loginReducer);
  const userProfileImg = useSelector((state) => state.userProfileReducer);
  const getMyGroupTitle = useSelector((state) => state.myGroupTitleReducer);
  const myGroupStatus = useSelector((state) => state.myGroupStatusReducer);
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
      sessionStorage.removeItem("USER");
      dispatch(loginToken(""));
      alert("로그아웃 되었습니다");
      window.location.reload();
    }
  };

  const handleMyGroup = (e) => {
    setDropDownOpen(false);
    if (e.target.innerText === "내 기수 블로그") {
      setSelectedMenu(e.target.innerText);
      history.push("/MyGroup");
    } else {
      setCreateMyGroupModalOn(true);
    }
  };

  return (
    <NavContainer onMouseLeave={() => setDropDownOpen(false)}>
      {isModalOn && <Login setModalOn={setModalOn} />}
      {isCreateMyGroupModalOn && (
        <CreateMyGroup setCreateMyGroupModalOn={setCreateMyGroupModalOn} />
      )}
      <LogoWrap>
        <Logo>
          <Link to="/">
            <img className="logoImage" alt="logo" src="/Images/logo.png" />
          </Link>
          <div className="logoText">{">"}wechicken</div>
        </Logo>
        <NthTitle>{getMyGroupTitle}</NthTitle>
      </LogoWrap>
      <UserWrap>
        <SearchIcon>
          <div className="searchIcon">{SearchSvg}</div>
        </SearchIcon>
        {loginStatus ? (
          <>
            <div onMouseOver={() => setDropDownOpen(true)}>
              <ProfileIcon size={50} img={userProfileImg} />
            </div>
          </>
        ) : (
          <div onClick={() => setModalOn(true)}>
            <BtnTheme value={"로그인"} />
          </div>
        )}
      </UserWrap>
      {isdropDownOpen && (
        <Dropdown>
          <li
            className={
              selectedMenu === "내 기수 블로그" ? "focused" : undefined
            }
          >
            <div onClick={handleMyGroup}>
              {myGroupStatus ? "내 기수 블로그" : "내 기수 페이지 생성"}
            </div>
          </li>
          <li
            onClick={handleSelected}
            className={selectedMenu === "북마크" ? "focused" : undefined}
          >
            <Link to="/Liked">북마크</Link>
          </li>
          <li
            onClick={handleSelected}
            className={selectedMenu === "마이페이지" ? "focused" : undefined}
          >
            <Link to="/MyPage">마이페이지</Link>
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

const UserWrap = styled.div`
  ${flexCenter}
  height: 47px;
`;

const SearchIcon = styled.div`
  ${flexCenter}
  width: 38px;
  height: 38px;
  margin-right: 18px;
  border-radius: 50%;
  background-color: inherit;
  &:hover {
    background-color: ${theme.grey};
  }
  .searchIcon svg {
    width: 22px;
    height: 22px;
    margin-top: 3px;
    fill: ${theme.deepGrey};
    cursor: pointer;
  }
`;

const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px 0px;
  position: absolute;
  width: 190px;
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
