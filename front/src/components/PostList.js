import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  const clickPostTitle = (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    axios.get("/post/list").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[1000px] border flex-col items-center py-1">
        <div className="w-full flex text-center">
          <div className="flex-auto">게시 번호</div>
          <div className="flex-auto">제목</div>
          <div className="flex-auto">작성자</div>
          <div className="flex-auto">날짜</div>
        </div>
        {posts &&
          posts.map((post, i) => (
            <div key={post.num} className="w-100 flex pt-1">
              <div className="flex-auto text-center">{post.num}</div>
              <div
                className="flex-auto"
                onClick={() => clickPostTitle(post.num)}
              >
                {post.title}
              </div>
              <div className="flex-auto text-center">{post.id}</div>
              <div className="flex-auto text-center">{post.date}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PostList;
