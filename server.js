import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import ProductManager from "./managers/ProductManager.js";

const httpServer = createServer(app);
const io = new Server(httpServer);

const productManager = new ProductManager("./src/data/products.json");

io.on("connection", async socket => {
  console.log("Cliente conectado");

  socket.emit("products", await productManager.getProducts());

  socket.on("addProduct", async product => {
    await productManager.addProduct(product);
    io.emit("products", await productManager.getProducts());
  });

  socket.on("deleteProduct", async id => {
    await productManager.deleteProduct(id);
    io.emit("products", await productManager.getProducts());
  });
});

httpServer.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080");
});
