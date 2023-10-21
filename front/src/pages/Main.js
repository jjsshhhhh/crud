import LogInButton from "../components/LogInButton";
import getAuth from "../api/getAuth";
import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import { Route, Routes } from "react-router-dom";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Post from "./Post";

function Main() {
  const [isLogined, setIsLogined] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    getAuth().then((res) => {
      if (res.data.length > 0) {
        setIsLogined(true);
        setUser(res.data);
      } else {
        setIsLogined(false);
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      <LogInButton isLogined={isLogined} user={user} />
      <PostList />
    </>
  );
}

export default Main;
