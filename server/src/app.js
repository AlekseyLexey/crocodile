const express = require("express");
const serverConfig = require("./config/serverConfig");
const indexRoutes = require("./routes/indexRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { sequelize } = require("../db/models");

sequelize.authenticate(console.log("BD connection"));

const app = express();

serverConfig(app);

app.use("/api", indexRoutes);
app.use(errorMiddleware);

module.exports = app;
