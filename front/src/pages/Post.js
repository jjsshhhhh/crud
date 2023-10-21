import getAuth from "../api/getAuth";
import { useState, useEffect } from "react";
import PostEditor from "../components/PostEditor";
import LogInModal from "../components/LogInModal";

function Post() {
  const [isLogined, setIsLogined] = useState(true);
  const [user, setUser] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState(null);

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
      <PostEditor
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        user={user}
        postNum={null}
      />

      {!isLogined && (
        <LogInModal setIsLogined={setIsLogined} setUser={setUser} />
      )}
    </>
  );
}

export default Post;
