import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

const httpServer = createServer(app);
const io = new Server(httpServer);

connectDB();

io.on("connection", async socket => {
  console.log("Cliente conectado");

  socket.emit("products", await Product.find().lean());

  socket.on("addProduct", async product => {
    await Product.create(product);
    io.emit("products", await Product.find().lean());
  });

  socket.on("deleteProduct", async id => {
    await Product.findByIdAndDelete(id);
    io.emit("products", await Product.find().lean());
  });
});

httpServer.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080");
});
