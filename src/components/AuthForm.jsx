import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "libs/firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function AuthForm({}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = ({ target: { name, value } }) =>
    setForm({ ...form, [name]: value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = form;
    try {
      let providerData;
      if (newAccount) {
        providerData = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        providerData = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      }
      console.log(providerData);
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    }
  };
  const onCheckAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <form onSubmit={onSubmit}>
      <FormInput
        name='email'
        type='email'
        placeholder='이메일을 입력해주세요'
        required
        value={form.email}
        onChange={onChange}
      />
      <FormInput
        name='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
        required
        value={form.password}
        onChange={onChange}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <ButtonArea>
        <input type='submit' value={newAccount ? "가입하기" : "로그인하기"} />
        <button onClick={onCheckAccount}>
          {newAccount ? "로그인하기" : "가입하기"}
        </button>
      </ButtonArea>
    </form>
  );
}

export default AuthForm;

const FormInput = styled.input`
  width: 300px;
  height: 55px;
  border: 1px solid rgb(207, 217, 222);
  border-radius: 4px;
  font-size: 17px;
  padding: 10px;
  margin-bottom: 10px;
`;
const ButtonArea = styled.div`
  input {
    display: block;
    margin: 0 auto;
    width: 300px;
    height: 35px;
    font-size: 15px;
    border: 1px solid rgb(207, 217, 222);
    border-radius: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    cursor: pointer;
  }
  button {
    font-size: 14px;
    color: rgb(29, 155, 240);
  }
`;
const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
`;
