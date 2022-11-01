import React, { useState } from "react";
import { authService } from "libs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

function Auth() {
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

  const onGoogleSubmit = () => {
    let GoogleProviderData = new GoogleAuthProvider();
    signInWithPopup(authService, GoogleProviderData)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // URL 에러 있음 추후에 수정
  const onFacebookSubmit = () => {
    let facebookProviderData = new FacebookAuthProvider();
    signInWithPopup(authService, facebookProviderData)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onCheckAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <button name='google' onClick={onGoogleSubmit}>
            Google 계정으로 로그인하기
          </button>
          <button name='fackbook' onClick={onFacebookSubmit}>
            Facebook 계정으로 로그인하기
          </button>
          <span>또는</span>
        </div>
        <input
          name='email'
          type='email'
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
        {error && <span>{error}</span>}
        <input type='submit' value={newAccount ? "가입하기" : "로그인하기"} />
        <button onClick={onCheckAccount}>
          {newAccount ? "로그인하기" : "가입하기"}
        </button>
        <div>
          <input type='submit' value='비밀번호를 잊으셨나요?' />
        </div>
      </form>
    </div>
  );
}

export default Auth;
