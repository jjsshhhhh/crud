import { Link } from "react-router-dom";
import axios from "axios";

function LogInButton({ isLogined, user }) {
  const clickLogOut = () => {
    axios.delete("/auth/logout").then((res) => {
      if (res.data === "logout") {
        window.location.reload(true);
      }
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-[1000px]">
        {isLogined ? (
          <div className="flex flex-col items-end m-4">
            <div>{user} 님</div>
            <button className="text-sm text-gray-500" onClick={clickLogOut}>
              로그아웃
            </button>
            <div className="mt-4">
              <Link
                to="/post"
                className="border rounded px-2 py-1 bg-black text-white"
              >
                글쓰기
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-2 m-4">
            <Link to="/signup" className="">
              회원가입
            </Link>
            <Link to="/login" className="">
              로그인
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogInButton;
