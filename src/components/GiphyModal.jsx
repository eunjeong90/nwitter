import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import GiphyItems from "./GiphyItems";

const GIPHY_SEARCH_BASE_URL = "https://api.giphy.com/v1/gifs/search";

function GiphyBox({ setImgFile, showModal, setShowModal }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState([
    {
      label: "안녕",
      url: "https://media3.giphy.com/media/3ogwFGEHrVxusDbDjO/200.gif?cid=d70ad5596o4bmm6guz9al6frgldyaajgmt9h30adyphtmgg0&rid=200.gif&ct=g",
    },
    {
      label: "박수",
      url: "https://media0.giphy.com/media/zfNAMCrhSQzte/200.gif?cid=d70ad5591egnsfggnngab7h7ssk9yukrarxnz37dpckr5ztt&rid=200.gif&ct=g",
    },
    {
      label: "귀여워",
      url: "https://media0.giphy.com/media/4Zo41lhzKt6iZ8xff9/200.gif?cid=d70ad5596ys6flf4jjfs3r0x53tyc4zznv2ez08222uft7pp&rid=200.gif&ct=g",
    },
    {
      label: "댄스",
      url: "https://media1.giphy.com/media/etOX3h7ApZuDe7Fc5w/200.gif?cid=d70ad559rz6nenh0b97wqotxu091u8f5rw6lbrm0yc0x2tkf&rid=200.gif&ct=g",
    },
    {
      label: "절레절레",
      url: "https://media2.giphy.com/media/NpL4D3Oc2bJUMAXF9P/200.gif?cid=d70ad559dw25nmk7t1cpgx0jw29ndkc3sgxtzkrpdibd96d6&rid=200.gif&ct=g",
    },
    {
      label: "맙소사",
      url: "https://media0.giphy.com/media/QYY4cJp6EzEIbMUtIn/200.gif?cid=d70ad559zxj17jv11zv99bz9na51e6a85ny6mil7uwaklete&rid=200.gif&ct=g",
    },
    {
      label: "무서워",
      url: "https://media0.giphy.com/media/3o7TKCEuECLAqDYEY8/200.gif?cid=d70ad5597tpie2dgbnvcz28aanasv4bxtjzvhjb997vj909g&rid=200.gif&ct=g",
    },
    {
      label: "스펀지밥",
      url: "https://media1.giphy.com/media/Nfg4l6AYarCBG/200.gif?cid=d70ad559rtdca8w9nhs6zt2xihr9ha3m04zgqr2fedp1xzaz&rid=200.gif&ct=g",
    },
    {
      label: "심슨",
      url: "https://media0.giphy.com/media/a93jwI0wkWTQs/200.gif?cid=d70ad559c2wa3xzxiso5ufqliqmiqqovb04s0yjoaooa49qq&rid=200.gif&ct=g",
    },
  ]);
  const [moveCategory, setMoveCategory] = useState(false);
  const [searchGifArr, setSearchGifArr] = useState([]);
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
      ])
      .then(
        axios.spread((searchRes) => {
          setSearchGifArr(searchRes.data.data);
          // console.log(searchRes);
        })
      )
      .catch((error) => console.error(error));
  };
  const onKeywordClick = (keyword) => {
    setSearchGif(keyword.label);
    setMoveCategory(true);
  };
  const onBackClick = () => {
    setMoveCategory(false);
    // navigate(-1);
    setSearchGif("");
  };
  const handleInputChange = ({ target: { value } }) => {
    if (searchGif === "") {
      onBackClick();
    } else {
      setSearchGif(value);
    }
  };
  useEffect(() => {
    if (searchGif === "") {
      return onBackClick();
    }
  }, [searchGif]);
  return (
    <>
      {showModal ? (
        <>
          <StyledModalWrap>
            <StyledGiphyModal>
              {moveCategory ? (
                <>
                  <StyledSearchArea>
                    <Link onClick={onBackClick}>
                      <FontAwesomeIcon icon={faArrowLeft} size='5x' />
                    </Link>
                    <StyledSearchInput
                      type='text'
                      placeholder='GIF 검색'
                      value={searchGif}
                      onChange={handleInputChange}
                      // onkeypress={(e) => getSearchData(e)}
                    />
                  </StyledSearchArea>
                  <GIFArea>
                    <GiphyItems
                      searchGifArr={searchGifArr}
                      setImgFile={setImgFile}
                      moveCategory={moveCategory}
                      setShowModal={setShowModal}
                      onBackClick={onBackClick}
                    />
                  </GIFArea>
                </>
              ) : (
                <>
                  <StyledSearchArea>
                    <Link onClick={() => setShowModal(false)}>
                      <FontAwesomeIcon icon={faXmark} size='5x' />
                    </Link>

                    <StyledSearchInput
                      type='text'
                      placeholder='GIF 검색'
                      value={searchGif}
                      onChange={({ target: { value } }) => setSearchGif(value)}
                      // onkeypress={(e) => getSearchData(e)}
                    />
                  </StyledSearchArea>
                  <GIFArea>
                    {moveCategory ? (
                      <GiphyItems
                        searchGifArr={searchGifArr}
                        setImgFile={setImgFile}
                        moveCategory={moveCategory}
                        setMoveCategory={setMoveCategory}
                      />
                    ) : (
                      <>
                        {searchGifArr?.map((gif, index) => {
                          let select = gif.images.fixed_height.url;
                          return (
                            <img
                              src={select}
                              key={gif + index}
                              alt={gif.title}
                            />
                          );
                        })}
                        {keyword?.map((keyword, index) => {
                          return (
                            <StyledSearchBackground
                              key={keyword + index}
                              onClick={() => onKeywordClick(keyword)}
                              to={`?search=${keyword.label}`}
                              role='presentation'
                            >
                              <p>{keyword.label}</p>
                              <img src={keyword.url} alt='img' />
                            </StyledSearchBackground>
                          );
                        })}
                      </>
                    )}
                  </GIFArea>
                </>
              )}
            </StyledGiphyModal>
          </StyledModalWrap>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default GiphyBox;

const StyledModalWrap = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
`;
const StyledGiphyModal = styled.div`
  height: auto;
  max-height: 550px;
  height: 550px;
  position: absolute;
  top: 155px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid rgb(217 217 217);
  width: 620px;
  padding: 10px;
  border-radius: 20px;
`;
const GIFArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  gap: 5px;
  max-height: 466px;

  overflow-y: auto;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;
const StyledSearchArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > a {
    margin-right: 15px;
    margin-left: 5px;
    cursor: pointer;
  }
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
const StyledSearchBackground = styled(Link)`
  position: relative;
  color: white;
  font-size: 20px;
  width: 100%;
  height: 150px;
  cursor: pointer;
  p {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    filter: brightness(60%);
  }
`;
