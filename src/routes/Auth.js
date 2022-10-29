import React, { useState } from "react";
import { Link } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  console.log(email);
  console.log(password);
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <button>Google 계정으로 로그인하기</button>
          <button>Facebook 계정으로 로그인하기</button>
          <span>또는</span>
        </div>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <input type='submit' value='로그인하기' />
        <div>
          <input type='submit' value='비밀번호를 잊으셨나요?' />
          <strong>
            계정이 없으신가요? <Link to=''>가입하기</Link>
          </strong>
        </div>
      </form>
    </div>
  );
}

export default Auth;
