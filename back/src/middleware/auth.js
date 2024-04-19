const jwt = require("jsonwebtoken");
const User = require("../models/User");

let auth = async (req, res, next /* next는 함수다 */) => {
  // 토큰을 가져오기

  const authHeader = req.headers["authorization"];

  // Bearer .eidkfiek.dieksldsoieiw.dsowefieflksdfkl
  /* 있으면 실행 없으면 실행X */
  const token =
    authHeader &&
    authHeader.split(
      /* 빈공간으로 구간을 나눔 / 슬래시를 넣으면 슬래시로 공간,구간을 나눔*/ " "
    )[1];
  if (token === null) return res.sendStatus(401);

  console.log("token" + token);

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decode.userId });

    if (!user) {
      return res.status(400).send("없는 아이디입니다. 아이디를 확인해주세요.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
