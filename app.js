import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import viewsRouter from "./routes/views.router.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "handlebars");


app.use("/", viewsRouter);


io.on("connection", socket => {
  console.log("Cliente conectado");
});

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("MongoDB conectado");

    httpServer.listen(8080, () => {
      console.log("Servidor escuchando en http://localhost:8080");
    });
  })
  .catch(err => {
    console.error("Error MongoDB:", err);
    process.exit(1);
  });






