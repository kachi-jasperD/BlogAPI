require("dotenv").config();

const express = require("express");
const cors = require("cors");
const RequestLogger = require("./middlewares/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");
const ArticleRoutes = require("./routes/article.route.js");
const CommentRoutes = require("./routes/comment.route.js");
const app = express();
const port = process.env.PORT || 3000;

//------------------------------------
// MIDDLEWARE
//------------------------------------
app.use(express.json());
app.use(cors());
app.use(RequestLogger);

//------------------------------------
// DATABASE CONNECTION
//------------------------------------
const connectDB = require("./database/connectDB.js");
connectDB();

//------------------------------------
// ROUTES
//------------------------------------

app.use("/api", ArticleRoutes);
app.use("/api", CommentRoutes);

//------------------------------------
// LAST MIDDLEWARE
//------------------------------------

app.use(errorHandler);

//------------------------------------
// SERVER
//------------------------------------
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
