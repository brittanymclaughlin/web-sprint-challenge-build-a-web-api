const express = require("express");
const actionRouter = require("./data/helpers/actionRouter.js");
const projectRouter = require("./data/helpers/projectRouter.js");
const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.listen(port , ()=> console.log(`listening on port : ${port}`));