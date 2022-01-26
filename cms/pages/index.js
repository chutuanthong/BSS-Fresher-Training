import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
        const url = `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/v1/users/gets?_user=${userName}&_pass=${passWord}`;
        let responJSON = await (await fetch(url)).json();
        if (responJSON.data.id != -1) {
          window.localStorage.setItem("user", responJSON.data.user);
          router.push("/dashboard");
        } else {
          alert("userName and passWord incorect!!!");
          setUserName("");
          setPassword("");
        }
      } catch (error) {}
    };
    getApi();
  };

  // nếu đã đăng nhậP thì sẽ tự động sang trang dashboard
  useEffect(() => {
    if(window.localStorage.getItem('user')){
      router.push("/dashboard");
    }
  }, [])

  return (
    <div className="Main-container">
      <div className="container-login">
        <div className="wrap-login">
          <div className="login-pic">
            <img src="/Images/bssgroup-logo.jpg" alt="IMG" />
          </div>
          <div className="login-form">
            <span className="login-form-title">SOIOT SYSTEM</span>
            <div className="wrap-input">
              <input
                type="text"
                className="input"
                name="email"
                placeholder="Email"
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
                Login
              </button>
            </div>
            <div className="text-center p-t-1">
              <span className="txt1">Forgot</span>
              <a href="#" className="txt2">
                {" "}
                Username / Password ?
              </a>
            </div>
            <Link href="/createaccount">
              <a>
                <div className="text-center p-t-2">
                    Create Your Account
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                </div>
              </a>
            </Link>
          </div>
          {/* <form className="login-form" onSubmit={checkUserAndPass}> */}

          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
