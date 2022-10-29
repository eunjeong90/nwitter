import React, { useState } from "react";
import { Link } from "react-router-dom";

function Auth() {
  const [form, setForm] = useState({ email: "", password: "" });
  const onChange = ({ target: { name, value } }) =>
    setForm({ ...form, [name]: value });
  console.log(form);
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
          value={form.email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={form.password}
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
