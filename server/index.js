const express = require("express");
const dotenv = require("dotenv");
const connection = require("./DB/db");
const LoginRouter = require("./Controllers/Router.controller");
const routerss = require("./Controllers/user.controller");
const cors = require("cors");
const GetRouter = require("./Controllers/Get.module");
const PostRouter = require("./Controllers/Post.module");
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use("/geotag", LoginRouter);
app.use("/geotag", routerss);
app.use("/geotag", GetRouter);
app.use("/geotag", PostRouter);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  try {
    connection();
    console.log("Port is running on:" + port);
  } catch (error) {
    console.log(error);
  }
});
