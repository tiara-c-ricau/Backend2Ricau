import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import path from "path";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👉 STATIC (ACÁ VA)
app.use(express.static(path.join(process.cwd(), "src", "public")));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "src", "views"));
app.set("view engine", "handlebars");

// Routers
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

export default app;


