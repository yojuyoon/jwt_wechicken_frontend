import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../../Components/Card/Card";
import InputTheme from "../../Components/Buttons/InputTheme";
import { API_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { searchAction } from "../../store/actions/searchAction";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const searchKeyword = useSelector(state => state.searchKeywordReducer);
  const [keyword, setKeyword] = useState(searchKeyword);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchAction("search"));

    return () => {
      dispatch(searchAction(""));
    };
  }, [dispatch]);

  useEffect(() => {
    let handleDebouncingWords = setTimeout(() => {
      setPosts([]);
      keyword && FetchSearchingWords();
    }, 1000);

    return () => {
      clearTimeout(handleDebouncingWords);
    };
    // eslint-disable-next-line
  }, [keyword]);

  const FetchSearchingWords = () => {
    axios
      .get(
        `${API_URL}/search?keyword=${keyword}`,
        sessionStorage.getItem("USER") && {
          headers: {
            Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
          },
        }
      )
      .then(res => {
        setPosts(res.data.posts);
      });
  };

  return (
    <Container>
      <SearchWrap>
        <InputTheme
          width={650}
          value={keyword}
          handleType={setKeyword}
          size={45}
        />
      </SearchWrap>
      <PostWrap>
        {!posts.length
          ? postStatus(keyword)
          : posts.map(post => (
              <Card
                post={post}
                width={650}
                space={20}
                key={post.id}
                search={true}
              />
            ))}
      </PostWrap>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  padding: 111px 200px 0px;
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostWrap = styled.div`
  padding: 45px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NoResult = styled.div`
  color: ${({ theme }) => theme.orange};
`;

const postStatus = keyword => {
  const keywordError = {
    [!keyword]: <NoResult>검색 키워드를 입력해주세요</NoResult>,
    [!!keyword]: <NoResult>검색 결과가 없습니다</NoResult>,
  };

  return keywordError[true];
};
