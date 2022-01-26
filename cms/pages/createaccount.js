import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [res, setRes] = useState();
  const router = useRouter();

  const userNameChange = (event) => {
    setUserName(event.target.value);
  };
  const passWordChange = (event) => {
    setPassword(event.target.value);
  };
  const checkUserAndPass = (e) => {
    const getApi = async () => {
      try {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: userName,
            pass: passWord,
          }),
        };
        if (userName && passWord) {
          const url = `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/v1/users/get-all`;
          let respone=await fetch(url, requestOptions) ;
          let responJSON = await respone.json();
          alert(responJSON.comment);
          if(responJSON.status==="Success"){
              router.push("/");
          }
        } else {
          alert("user or pass invalid");
          setUserName("");
          setPassword("");
        }   
      } catch (error) {
        alert("fail to add device");
        setUserName("");
          setPassword("");
      }
    };

    getApi();
  };

  return (
    <div className="Main-container">
      <div className="container-login">
        <div className="wrap-login">
          <div className="login-pic">
            <img src="/Images/bssgroup-logo.jpg" alt="IMG" />
          </div>
          <div className="login-form">
            <span className="login-form-title">Create Account</span>
            <div className="wrap-input">
              <input
                type="text"
                className="input"
                name="email"
                placeholder="UserName"
                required
                value={userName}
                onChange={userNameChange}
              />
              <span className="focus-input" />
              <span className="symbol-input">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
            </div>
            <div className="wrap-input">
              <input
                type="password"
                className="input"
                name="pass"
                placeholder="Password"
                required
                value={passWord}
                onChange={passWordChange}
              />
              <span className="focus-input" />
              <span className="symbol-input">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
            </div>
            <div className="login-form-btn-container">
              <button onClick={checkUserAndPass} className="login-form-btn">
                Create Account
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
