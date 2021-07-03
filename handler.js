const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { routes: storeRoutes } = require("./store/routes.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/store", storeRoutes);

module.exports.handler = serverless(app);
