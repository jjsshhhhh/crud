import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./pages/Post";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Content from "./pages/Content";

function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/">
          <div className="h-[150px] bg-black text-white text-center">
            CRUD 게시판
          </div>
        </Link>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/post" element={<Post />} />
          <Route path=":postNum/*" element={<Content />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
