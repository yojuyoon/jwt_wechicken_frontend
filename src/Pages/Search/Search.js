import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import Card from "../../Components/Card/Card";
import InputTheme from "../../Components/Buttons/InputTheme";
import usePagination from "../../hooks/usePagination";
import { searchAction } from "../../store/actions/searchAction";
import { SEARCH_URL } from "../../config";
import { SEARCH_RESULTS_LIMIT } from "../../constants";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const searchKeyword = useSelector((state) => state.searchKeywordReducer);
  const [keyword, setKeyword] = useState(searchKeyword);
  const [isSearching, setIsSearching] = useState(true);
  const paginationRef = useRef(null);
  const [page, setPage] = usePagination(paginationRef.current, posts.length);
  const [isFinal, setFinal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchAction("search"));

    return () => {
      dispatch(searchAction(""));
    };
  }, [dispatch]);

  useEffect(() => {
    const handleDebouncingWords = setTimeout(() => {
      setIsSearching(true);
      keyword && FetchSearchingWords();
    }, 500);

    if (!keyword) {
      window.scrollTo(0, 0);
      setPosts([]);
      setFinal(false);
      setPage(0);
    }

    return () => {
      clearTimeout(handleDebouncingWords);
    };
    // eslint-disable-next-line
  }, [keyword, page]);

  const FetchSearchingWords = () => {
    axios
      .get(
        `${SEARCH_URL}/search?keyword=${keyword}&page=${page}&size=${SEARCH_RESULTS_LIMIT}`,
        sessionStorage.getItem("USER") && {
          headers: {
            Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
          },
        }
      )
      .then((res) => {
        !res.data.posts.length && setFinal(true);
        setPosts([...posts, ...res.data.posts]);
        setIsSearching(false);
      });
  };
  return (
    <>
      <SearchWrap>
        <InputTheme
          width={650}
          value={keyword}
          handleType={setKeyword}
          size={45}
        />
      </SearchWrap>
      <PostWrap>
        {posts.length && keyword
          ? posts.map((post) => (
              <>
                <Card
                  post={post}
                  width={650}
                  space={20}
                  key={post.id}
                  search={true}
                />
                {!isFinal && (
                  <div ref={paginationRef} style={{ height: "10px" }} />
                )}
              </>
            ))
          : searchingStatus(keyword, isSearching)}
      </PostWrap>
    </>
  );
};

export default Search;

const SearchWrap = styled.div`
  width: 100%;
  padding: 100px 0 80px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  margin: 0 auto;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 24%,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const PostWrap = styled.div`
  padding-top: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NoResult = styled.div`
  color: ${({ theme }) => theme.orange};
`;

const searchingStatus = (keyword, isSearching) => {
  const keywordError = {
    [!keyword]: <NoResult>검색 키워드를 입력해주세요</NoResult>,
    [!!keyword && isSearching]: <NoResult>검색 중 입니다</NoResult>,
    [!!keyword && !isSearching]: <NoResult>검색 결과가 없습니다</NoResult>,
  };

  return keywordError[true];
};
