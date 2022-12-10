import styled from "styled-components";

export const StyledCreateForm = styled.form`
  padding: 0 16px;
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(239, 243, 244);
  div {
    &:nth-child(2) {
      width: 100%;
    }
  }
`;
export const ProfileBox = styled.div`
  img {
    width: 48px;
    height: 48px;
    border-radius: 50px;
    margin: 0 15px 0 0;
  }
`;
export const ChatArea = styled.div`
  display: flex;
  position: relative;
`;
export const ChatBox = styled.textarea`
  width: 100%;
  border: none;
  font-size: 20px;
  outline: 0;
  resize: none;
  white-space: pre-wrap;
  height: auto;
  margin-top: 12px;
`;
export const PreviewArea = styled.div`
  all: unset;
  position: relative;
  div {
    width: 100%;
    max-height: 670px;
    margin: 10px 0 20px;
  }
  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: 10px;
  }
  button {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 18px;
    left: 10px;
  }
  svg {
    color: white;
  }
`;
export const StyledFileUpload = styled.label`
  input {
    display: none;
  }
`;
export const StyledGifButton = styled.button`
  font-size: 15px;
`;
export const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input[type="submit"] {
    border: none;
    background-color: #f59e4d;
    color: white;
    width: 90px;
    height: 36px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 20px;
    line-height: 36px;
    cursor: pointer;
  }
  svg {
    color: #f59e4d;
  }
  div {
    display: flex;
    align-items: center;
    width: 70%;
  }
`;

// 느윗 포스트 스타일링
export const StyledNweetsArea = styled.div`
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  > div {
    padding: 15px 16px 10px 16px;
    display: flex;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(239, 243, 244);
    &:nth-child(2) {
      width: 100%;
    }
  }
`;
export const StyledNweet = styled.div`
  flex-grow: 1;
  font-size: 15px;
  strong {
    font-weight: bold;
  }
  span {
    margin-left: 8px;
  }
  p {
    margin-top: 5px;
  }
`;
export const NweetButtonArea = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: end;
  button {
    width: 70px;
    background: #eb4152f2;
    height: 28px;
    border-radius: 20px;
    color: white;
    &:last-child {
      margin-left: 5px;
      background-color: #007aeb;
    }
  }
`;

// 느윗 게시글 수정 form
export const StyledUpdateForm = styled.form`
  padding: 0 16px;
  div {
    display: flex;
    justify-content: flex-end;
  }
  input {
    font-size: 13px;
    border: none;
    width: 70px;
    background: gray;
    height: 28px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    &:last-child {
      margin-left: 5px;
    }
  }
  input[type="submit"] {
    background-color: #007aeb;
  }
`;
export const StyledUpdateChatBox = styled(ChatBox)`
  /* font-size: 20px; */
`;

// 이모지
export const StyledEmojiPopup = styled.div`
  position: absolute;
  top: 100px;
  z-index: 100;
  .emoji-mart-bar {
    &:last-child {
      display: none;
    }
  }
  .emoji-mart-search {
    display: none;
  }
`;
export const StyledEmojiButton = styled.button`
  font-size: 15px;
  margin: 0 10px;
`;
