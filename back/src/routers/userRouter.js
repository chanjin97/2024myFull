const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");

userRouter.get("/", async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const password = await hash(req.body.password, 10);
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password,
      createdAt: new Date(),
    }).save();
    return res.status(200).send({ user });
  } catch (error) {}
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "이메일이 없습니다 다시 확인해주세요." });
    }
    const isMatch = await compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "비밀번호가 틀립니다 다시 확인해주세요" });
    }

    const payload = {
      userId: user._id.toHexString(),
      email: user.email /* 찾은애(find)의 user의 eamil */,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      /* 1시간동안 이 토큰을 유효하게 하겠다 */ expiresIn: "1h",
    });

    return res.status(200).send({ user, accessToken, message: "로그인 ok" });
  } catch (error) {
    return res.status(500).send({ message: "login fail" });
  }
});

userRouter.get("/auth", /* middleware */ auth, async (req, res) => {
  try {
    const user = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      image: req.user.image,
    };
    return res.status(200).send({ user });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
});
userRouter.post("/logout", /* middleware */ auth, async (req, res) => {
  try {
    return res.status(200).send({ message: "로그아웃 되었습니다." });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
});

module.exports = userRouter;
