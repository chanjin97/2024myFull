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
    const blogs = await Blog.find({});
    return res.status(200).send({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = { blogRouter };
