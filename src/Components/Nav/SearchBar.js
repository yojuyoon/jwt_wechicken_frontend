import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import { SearchSvg } from "../../Styles/svg";
import { useDispatch } from "react-redux";
import { searchAction } from "../../store/actions/searchAction";

function SearchBar() {
  const [isSearchActive, setSearchActive] = useState(false);
  const [keyword, setKeyword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInput = (e) => {
    setKeyword(true);
    if (e.keyCode === 13) {
      dispatch(searchAction(e.target.value));
      history.push("/search");
    }
  };

  return (
    <>
      <Input isSearchActive={isSearchActive}>
        <input
          onKeyDown={(e) => handleInput(e)}
          placeholder="블로그 포스팅을 검색하세요"
        />
      </Input>
      <SearchIcon
        isSearchActive={isSearchActive}
        onClick={() => {
          !keyword && setSearchActive(!isSearchActive);
        }}
        onBlur={() => setSearchActive(!isSearchActive)}
      >
        {SearchSvg}
      </SearchIcon>
    </>
  );
}

export default SearchBar;

const Input = styled.div`
  input {
    width: 280px;
    height: 25px;
    border: none;
    outline: none;
    cursor: text;
    ::placeholder {
      padding-left: 5px;
      font-size: 14px;
      color: ${theme.orange};
      opacity: 0.7;
    }
    display: ${({ isSearchActive }) => (isSearchActive ? "block" : "none")};
  }
`;

const SearchIcon = styled.div`
  ${flexCenter}
  position: absolute;
  right: 85px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: inherit;
  transform: ${({ isSearchActive }) =>
    isSearchActive ? "translateX(-260px)" : "translateX(0)"};
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: ${theme.yellow};
  }

  svg {
    width: 22px;
    height: 22px;
    margin-top: 3px;
    fill: ${theme.deepGrey};
    cursor: pointer;
  }
`;
