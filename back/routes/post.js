const express = require("express");
const mysql = require("../config/db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { postNum, user, title, contentHTML, date } = req.body;
  const conn = await mysql.getConnection(async (conn) => conn);

  if (title) {
    if (postNum) {
      await conn.query(
        "UPDATE posts SET title = ?, content = ? WHERE num = ?",
        [title, contentHTML, postNum]
      );
    } else {
      await conn.query("INSERT INTO posts VALUES (null, ?, ?, ?, ?);", [
        user,
        title,
        contentHTML,
        date,
      ]);
    }
    res.send("POST");
  } else {
    res.send("제목을 입력하세요");
  }

  conn.release();
});

router.get("/list", async (req, res) => {
  const conn = await mysql.getConnection(async (conn) => conn);

  const [posts, fields] = await conn.query("SELECT * FROM posts");

  res.json(posts);
  conn.release();
});

router.get("/content", async (req, res) => {
  const postNum = req.query.postNum;
  const conn = await mysql.getConnection(async (conn) => conn);

  const [post, fields] = await conn.query(
    "SELECT * FROM posts WHERE num = ?",
    postNum
  );

  res.json(post[0]);
  conn.release();
});

router.delete("/delete", async (req, res) => {
  const postNum = req.body.postNum;
  const conn = await mysql.getConnection(async (conn) => conn);

  await conn.query("DELETE FROM posts WHERE num = ?", postNum);

  conn.release();
});

module.exports = router;
