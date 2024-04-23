const express = require("express");
const { default: mongoose } = require("mongoose");

/* module.exports = 에 {}를 넣었으면 받을때 넣어야하고 안넣었으면 뺀다 */
const User = require("../models/User");
const { Blog } = require("../models/Blog");
/* module.exports = 에 {}를 넣었으면 받을때 넣어야하고 안넣었으면 뺀다 */

const blogRouter = express.Router();

blogRouter.post("/", async (req, res) => {
  try {
    const { title, content, isLive, userId } = req.body;

    if (typeof title !== "string")
      res.status(400).send({ err: "title is requried" });
    if (typeof content !== "string")
      res.status(400).send({ err: "content is requried" });
    // if (isLive && isLive !== "boolean")
    //   res.status(400).send({ err: "isLive is requried" });
    if (!mongoose.isValidObjectId(userId))
      res.status(400).send({ err: "userId is required" });

    let user = await User.findById(userId);
    if (!user) res.status(400).send({ err: "user does not" });

    //   let blog = new Blog({...req.body.user})
    //   await blog.save()

    let blog = await new Blog({ ...req.body.user }).save();

    return res.status(200).send({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogRouter.get("/", async (req, res) => {
  try {
    let { page } = req.query;
    page = parseInt(page);
    const totalCnt = await Blog.countDocuments({});
    const blogs = await Blog.find({})
      .skip(page * 5) /* skip은 몇번째에서 몇번째까지 볼것이냐 */
      .limit(5) /* limit은 갯수 */
      .populate({
        path: "user",
        select: "email name",
      }); /* populate는 내가 정한, 원하는 정보만을 가져올수가 있음 */
    return res
      .status(200)
      .send({ blogs, totalCnt }); /* ({blogs:blogs , totalCnt:totalCnt}) */
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = { blogRouter };
