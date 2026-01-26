import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");


app.use("/", viewsRouter);

io.on("connection", socket => {
  console.log("Cliente conectado");
});

mongoose.connect("mongodb://localhost:27017/ecommerce")


httpServer.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080");
});




