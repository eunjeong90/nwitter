import React, { useEffect } from "react";
import styled from "styled-components";

function GiphyBox({ showGiphy, gifArr, searchGif, setSearchGif, setImgFile }) {
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
  };
  return (
    <GIFArea>
      {showGiphy && gifArr && (
        <>
          <input
            type='text'
            value={searchGif}
            onChange={({ target: { value } }) => setSearchGif(value)}
          />
          {gifArr.map((gif, index) => {
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
        </>
      )}
    </GIFArea>
  );
}

export default GiphyBox;

const GIFArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  gap: 5px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;
