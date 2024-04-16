const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  } catch (error) {
    console.log("post error");
  }
});

userRouter.post("login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ error: "이메일이 없습니다 다시 확인해주세요." });
    }
    const isMatch = await compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ error: "비밀번호가 틀립니다 다시 확인해주세요" });
    }

    const payload = {
      userId: user._id.toHexString(),
      email: user.email /* 찾은애(find)의 user의 eamil */,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).send({ user, accessToken, message: "로그인 ok" });
  } catch (error) {}
});

module.exports = userRouter;
