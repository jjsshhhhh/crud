import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [userId, setUserId] = useState();
  const [userPassword1, setUserPassword1] = useState();
  const [userPassword2, setUserPassword2] = useState();
  const navigate = useNavigate();

  const submitSignUp = (e) => {
    e.preventDefault();
    axios
      .post("/auth/signup", {
        userId,
        userPassword1,
        userPassword2,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "회원가입") {
          navigate("/login");
        } else {
          alert(res.data);
        }
      });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <form
        className="flex flex-col items-center gap-y-2"
        onSubmit={submitSignUp}
      >
        <div className="font-bold">회원가입</div>
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
            onChange={(e) => setUserPassword1(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            className="border rounded shadow px-2 py-1"
            type="password"
            maxLength={30}
            placeholder="비밀번호 확인"
            onChange={(e) => setUserPassword2(e.target.value)}
          ></input>
        </div>

        <button className="border rounded px-2 py-1 bg-black text-white">
          가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
