import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const GIPHY_SEARCH_BASE_URL = "http://api.giphy.com/v1/gifs/search";
const GIPHY_TRENDING_BASE_URL = "http://api.giphy.com/v1/gifs/trending";

function GiphyBox({ setImgFile, showGiphy }) {
  // const [keyword, setKeyword] = useState([
  //   "댄스",
  //   // "동감",
  //   // "박수",
  //   // "안녕",
  //   // "절레절레",
  //   // "무서워",
  //   // "스펀지밥",
  //   // "심슨",
  //   // "어드벤처 타임",
  // ]);
  const [searchGifArr, setSearchGifArr] = useState([]);
  const [trendingGifArr, setTrendingGifArr] = useState([]);
  const [searchGif, setSearchGif] = useState("");

  useEffect(() => {
    getGiphy();
  }, [searchGif]);

  const getGiphy = async () => {
    const res = await axios
      .all([
        axios.get(
          `${GIPHY_SEARCH_BASE_URL}?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${searchGif}&limit=27&offset=0&rating=pg-13&lang=ko`
        ),
        // axios.get(
        //   `${GIPHY_SEARCH_BASE_URL}?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${keyword}&limit=27&offset=0&rating=pg-13&lang=ko`
        // ),
        axios.get(
          `${GIPHY_TRENDING_BASE_URL}?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=27&rating=pg-13&lang=ko`
        ),
      ])
      .then(
        axios.spread((searchRes, trendingRes) => {
          setSearchGifArr(searchRes.data.data);
          // setTrendingGifArr(keywordRes.data.data);
          setTrendingGifArr(trendingRes.data.data);
          // console.log(trendingRes);
        })
      )
      .catch((error) => console.error(error));
  };
  const onSelectGifImage = async (url) => {
    setImgFile(url);
    const data = await fetch(url);
    const blob = await data.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const base64data = reader.result;
      setImgFile(base64data);
    };
    setShowGiphy(false);
  };
  return (
    <div>
      {showGiphy ? (
        <>
          <StyledSearchArea>
            <StyledSearchInput
              type='text'
              placeholder='GIF 검색'
              value={searchGif}
              onChange={({ target: { value } }) => setSearchGif(value)}
              // onkeypress={(e) => getSearchData(e)}
            />
            {/* <StyledButtonInput type='button' onClick={getGiphy} /> */}
          </StyledSearchArea>
          <GIFArea>
            {searchGifArr?.map((gif, index) => {
              let select = gif.images.fixed_height.url;
              return (
                <img
                  src={select}
                  key={gif + index}
                  alt={`${gif.title}`}
                  onClick={() => onSelectGifImage(select)}
                  role='presentation'
                />
              );
            })}
            {trendingGifArr?.map((gif, index) => {
              let select = gif.images.fixed_height.url;
              return (
                <img
                  src={select}
                  key={gif + index}
                  alt={`${gif.title}`}
                  onClick={() => onSelectGifImage(select)}
                  role='presentation'
                />
              );
            })}
          </GIFArea>
        </>
      ) : null}
    </div>
  );
}

export default GiphyBox;

const GIFArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  gap: 5px;
  max-height: 550px;
  overflow-y: auto;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;
const StyledSearchArea = styled.div`
  padding: 0 16px;
  position: relative;
`;
const StyledSearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 10px auto;
  border-radius: 50px;
  border: 1px solid rgb(239, 243, 244);
  font-size: 15px;
  &:focus {
    border: 2px solid #f59e4d;
  }
`;
const StyledButtonInput = styled.input`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
`;
