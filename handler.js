const serverless = require("serverless-http");
const express = require("express");

const { routes: storeRoutes } = require("./store/routes.js");

const app = express();

app.use("/store", storeRoutes);

module.exports.handler = serverless(app);
