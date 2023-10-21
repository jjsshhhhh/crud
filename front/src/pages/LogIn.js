import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../api/login";

function LogIn() {
  const [userId, setUserId] = useState();
  const [userPassword, setUserPassword] = useState();
  const navigate = useNavigate();

  const submitLogIn = (e) => {
    e.preventDefault();
    login(userId, userPassword).then((res) => {
      if (res.data === "로그인") {
        navigate("/");
      } else {
        alert(res.data);
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-y-4 mt-8">
      <form
        className="flex flex-col items-center gap-y-2"
        onSubmit={submitLogIn}
      >
        <div className="font-bold">로그인</div>
        <div>
          <input
            className="border rounded shadow px-2 py-1"
            type="text"
            maxLength={30}
            placeholder="아이디"
            onChange={(e) => setUserId(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            className="border rounded shadow px-2 py-1"
            type="password"
            maxLength={30}
            placeholder="비밀번호"
            onChange={(e) => setUserPassword(e.target.value)}
          ></input>
        </div>
        <button className="border rounded px-2 py-1 bg-black text-white">
          로그인
        </button>
      </form>

      <div className="flex flex-col items-center text-sm">
        <p>아직 회원이 아니신가요?</p>
        <Link to="/signup" className="font-bold">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default LogIn;
