import { Router } from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/products");
});

router.get("/products", async (req, res) => {
  const { page = 1 } = req.query;

  const result = await Product.paginate({}, { page, limit: 10, lean: true });

  res.render("index", result);
});


router.get("/products/:pid", async (req, res) => {
  const product = await Product.findById(req.params.pid).lean();
  res.render("productDetail", product);
});

router.get("/carts/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid)
    .populate("products.product")
    .lean();

  res.render("cart", cart);
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
