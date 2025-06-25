const express = require("express");
const cookeiParser = require("cookie-parser");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173", "https://crocdraw.ru"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

const serverConfig = (app) => {
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookeiParser());
};

module.exports = serverConfig;
