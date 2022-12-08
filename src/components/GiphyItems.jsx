import React from "react";

function GiphyItems({ searchGifArr, setImgFile, setShowModal }) {
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
    setShowModal(false);
  };
  return (
    <>
      {searchGifArr.map((gif, index) => {
        let select = gif.images.fixed_height.url;
        return (
          <img
            src={select}
            key={gif + index}
            alt={gif.title}
            onClick={() => onSelectGifImage(select)}
            role='presentation'
          />
        );
      })}
    </>
  );
}

export default GiphyItems;
