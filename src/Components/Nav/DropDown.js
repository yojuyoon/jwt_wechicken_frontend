import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

function DropDown({
  setDropDownOpen,
  selectedMenu,
  setSelectedMenu,
  setCreateMyGroupModalOn,
}) {
  const myGroupStatus = useSelector((state) => state.myGroupStatusReducer);
  const history = useHistory();
  const page = {
    myGroup: "내 기수 블로그",
    createMyGroup: "내 기수 페이지 생성",
    bookmark: "북마크",
    myPage: "마이페이지",
    logout: "로그아웃",
  };

  const handleSelected = (e) => {
    setSelectedMenu(e.target.innerText);
  };

  const handleFocus = (input) => {
    if (selectedMenu === input) return "focused";
  };

  const handleMyGroup = (e) => {
    setDropDownOpen(false);
    if (e.target.innerText === page.myGroup) {
      setSelectedMenu(e.target.innerText);
      history.push("/MyGroup");
    } else {
      setCreateMyGroupModalOn(true);
    }
  };

  return (
    <Container>
      <li onClick={handleMyGroup} className={handleFocus(page.myGroup)}>
        <div>{myGroupStatus ? page.myGroup : page.createMyGroup}</div>
      </li>
      <Link to="/Liked">
        <li onClick={handleSelected} className={handleFocus(page.bookmark)}>
          {page.bookmark}
        </li>
      </Link>
      <Link to="/MyPage">
        <li onClick={handleSelected} className={handleFocus(page.myPage)}>
          {page.myPage}
        </li>
      </Link>
      <li onClick={handleSelected}>{page.logout}</li>
    </Container>
  );
}

export default DropDown;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px 0px;
  position: absolute;
  width: 190px;
  height: 208px;
  right: 8vw;
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
