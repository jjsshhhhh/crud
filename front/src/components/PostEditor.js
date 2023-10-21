import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import LogInModal from "../components/LogInModal";
import axios from "axios";

function PostEditor({ title, setTitle, content, setContent, user, postNum }) {
  const editorRef = useRef();
  const navigate = useNavigate();

  const clickPost = () => {
    setContent(editorRef.current?.getInstance().getHTML());
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const date = today.getDate().toString().padStart(2, "0");
    const hour = today.getHours().toString().padStart(2, "0");
    const minute = today.getMinutes().toString().padStart(2, "0");
    console.log(editorRef.current?.getInstance().getHTML());

    axios
      .post("/post", {
        postNum: postNum,
        user: user,
        title: title,
        contentHTML: editorRef.current?.getInstance().getHTML(),
        date: `${year}.${month}.${date}. ${hour}:${minute}`,
      })
      .then((res) => {
        if (res.data == "POST") {
          navigate("/");
        } else {
          alert(res.data);
        }
      });
  };

  useEffect(() => {
    if (content) {
      editorRef.current?.getInstance().setHTML(content);
    }
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <div className="w-[1000px]">
        <input
          className="w-full border rounded mb-4 px-2 py-1"
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Editor
          ref={editorRef}
          initialEditType="wysiwyg"
          // previewStyle="vertical"
          placeholder="내용을 입력해주세요"
          hideModeSwitch={true}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
          ]}
        />
        <div className="flex justify-center gap-2 mt-8">
          <button
            className="rounded bg-black text-white text-sm px-1.5 py-1"
            onClick={clickPost}
          >
            글쓰기
          </button>
          <Link
            to="/"
            className="rounded bg-gray-500 text-white text-sm px-1.5 py-1"
          >
            취소
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostEditor;
