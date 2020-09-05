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

  const handleSelected = (e) => {
    setSelectedMenu(e.target.innerText);
  };

  const handleFocus = (input) => {
    if (selectedMenu === input) return "fucused";
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
    <Container>
      <li className={handleFocus("내 기수 블로그")}>
        <div onClick={handleMyGroup}>
          {myGroupStatus ? "내 기수 블로그" : "내 기수 페이지 생성"}
        </div>
      </li>
      <Link to="/Liked">
        <li onClick={handleSelected} className={handleFocus("북마크")}>
          북마크
        </li>
      </Link>
      <Link to="/MyPage">
        <li onClick={handleSelected} className={handleFocus("마이페이지")}>
          마이페이지
        </li>
      </Link>
      <li onClick={handleSelected} className={handleFocus("로그아웃")}>
        로그아웃
      </li>
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
  right: 140px;
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
