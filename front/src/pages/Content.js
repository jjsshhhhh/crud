import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import ContentView from "../components/ContentView";
import PostEditor from "../components/PostEditor";
import getAuth from "../api/getAuth";

function Content() {
  const postNum = useParams().postNum;
  const [post, setPost] = useState();
  const [isLogined, setIsLogined] = useState();
  const [user, setUser] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

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

  useEffect(() => {
    axios.get("/post/content", { params: { postNum } }).then((res) => {
      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, []);

  return (
    <div>
      <Routes>
        {post && (
          <Route
            path="/"
            element={<ContentView postNum={postNum} post={post} user={user} />}
          />
        )}

        <Route
          path="/modify"
          element={
            <PostEditor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              isLogined={isLogined}
              setIsLogined={setIsLogined}
              user={user}
              setUser={setUser}
              postNum={postNum}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Content;
