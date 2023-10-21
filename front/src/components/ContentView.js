import { useNavigate } from "react-router-dom";
import axios from "axios";

function ContentView({ postNum, post, user }) {
  const navigate = useNavigate();

  const clickUpdate = () => {
    navigate(`/${postNum}/modify`);
  };

  const clickDelete = () => {
    axios
      .delete("/post/delete", {
        data: {
          postNum,
        },
      })
      .then(navigate("/"));
  };

  return (
    <div className="flex justify-center">
      <div className="w-[1000px] mt-8">
        {post.id == user && (
          <div className="flex justify-end gap-2 mb-4">
            <button
              className="border rounded px-2 py-1 bg-gray-200 text-sm"
              onClick={clickUpdate}
            >
              수정
            </button>
            <button
              className="border rounded px-2 py-1 bg-gray-200 text-sm"
              onClick={clickDelete}
            >
              삭제
            </button>
          </div>
        )}

        <div className="border p-8">
          <div className="font-bold text-xl">{post.title}</div>
          <div className="text-sm">{post.id}</div>
          <div className="text-xs text-gray-400">{post.date}</div>

          <hr className="my-4" />
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </div>
    </div>
  );
}

export default ContentView;
