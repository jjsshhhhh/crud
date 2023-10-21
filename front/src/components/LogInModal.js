import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../api/login";

function LogInModal({ setIsLogined, setUser }) {
  const [userId, setUserId] = useState();
  const [userPassword, setUserPassword] = useState();

  const submitLogIn = (e) => {
    e.preventDefault();
    login(userId, userPassword).then((res) => {
      if (res.data === "로그인") {
        setIsLogined(true);
        setUser(userId);
      } else {
        alert(res.data);
      }
    });
  };

  return (
    <div className="w-screen h-screen inset-0 absolute bg-black bg-opacity-30">
      <form
        className="bg-white z-50 shadow-md px-8 py-8 overflow-auto fixed p-5 rounded-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onSubmit={submitLogIn}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col items-center">
          <input
            className="border rounded shadow px-2 py-1"
            type="text"
            maxLength={30}
            placeholder="아이디"
            onChange={(e) => setUserId(e.target.value)}
          ></input>
          <input
            className="border rounded shadow px-2 py-1 my-2"
            type="password"
            maxLength={30}
            placeholder="비밀번호"
            onChange={(e) => setUserPassword(e.target.value)}
          ></input>
          <button className="border rounded px-2 py-1 bg-black text-white">
            로그인
          </button>
        </div>

        <div className="flex flex-col items-center text-sm mt-4">
          <p>아직 회원이 아니신가요?</p>
          <Link to="/signup" className="font-bold">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogInModal;
