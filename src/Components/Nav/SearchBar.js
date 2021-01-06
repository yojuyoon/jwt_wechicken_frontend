import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { SearchSvg } from "../../Styles/svg";
import { searchAction } from "../../store/actions/searchAction";
import theme, { flexCenter } from "../../Styles/Theme";

function SearchBar() {
  const [isSearchActive, setSearchActive] = useState(false);
  const [keyword, setKeyword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInput = (e) => {
    e.target.value ? setKeyword(true) : setKeyword(false);
    if (e.keyCode === 13) {
      dispatch(searchAction(e.target.value));
      history.push("/search");
    }
  };

  return (
    <>
      <Input
        isSearchActive={isSearchActive}
        onKeyDown={(e) => handleInput(e)}
        placeholder="블로그 포스팅을 검색하세요"
      />
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

const Input = styled.input`
  width: 200px;
  height: 25px;
  border: none;
  outline: none;
  font-size: 18px;
  cursor: text;
  display: ${({ isSearchActive }) => (isSearchActive ? "block" : "none")};

  ::placeholder {
    padding-left: 5px;
    font-size: 14px;
    color: ${theme.orange};
    opacity: 0.7;
  }
`;

const SearchIcon = styled.div`
  ${flexCenter}
  position: absolute;
  right: 95px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: inherit;
  transform: ${({ isSearchActive }) =>
    isSearchActive ? "translateX(-180px)" : "translateX(0)"};
  transition: all 0.2s ease-in-out;

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
