const express = require("express");
const bcrpyt = require("bcrypt");
const mysql = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(req.session.userId);
});

router.post("/signup", async (req, res) => {
  const { userId, userPassword1, userPassword2 } = req.body;
  const conn = await mysql.getConnection(async (conn) => conn);

  if (userId && userPassword1 && userPassword2) {
    const [existedId] = await conn.query(
      "SELECT * FROM members WHERE id = ?",
      userId
    );

    if (existedId.length > 0) {
      res.send("이미 존재하는 아이디입니다");
    } else {
      if (userPassword1 == userPassword2) {
        const hPassword = bcrpyt.hashSync(userPassword1, 10);
        await conn.query("INSERT INTO members VALUES (?, ?)", [
          userId,
          hPassword,
        ]);

        res.send("회원가입");
      } else {
        res.send("비밀번호가 일치하지 않습니다");
      }
    }
  } else {
    if (!userId) {
      res.send("아이디를 입력하세요");
    } else if (!userPassword1) {
      res.send("비밀번호를 입력하세요");
    } else if (!userPassword2) {
      res.send("비밀번호를 확인하세요");
    }
  }

  conn.release();
});

router.post("/login", async (req, res) => {
  const { userId, userPassword } = req.body;
  const conn = await mysql.getConnection(async (conn) => conn);

  if (userId && userPassword) {
    const [existedId, fields] = await conn.query(
      "SELECT * FROM members WHERE id = ?",
      userId
    );

    if (existedId.length > 0) {
      const pwdResult = await bcrpyt.compare(
        userPassword,
        existedId[0].password
      );

      if (pwdResult === true) {
        req.session.userId = userId;
        req.session.save(res.send("로그인"));
      } else {
        res.send("로그인 정보가 일치하지 않습니다");
      }
    } else {
      res.send("존재하지 않는 아이디입니다");
    }
  } else {
    if (!userId) {
      res.send("아이디를 입력하세요");
    } else if (!userPassword) {
      res.send("비밀번호를 입력하세요");
    }
  }

  conn.release();
});

router.delete("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.send("logout");
  });
});

module.exports = router;
