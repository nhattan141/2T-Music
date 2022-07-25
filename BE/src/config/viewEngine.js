import express from "express";

const configViewEngine = (app) => {
    app.use(express.static("./src/public/views/"))
    app.set("view engine", "ejs")
    app.set("views", "./src/views")
}

module.exports = configViewEngine;