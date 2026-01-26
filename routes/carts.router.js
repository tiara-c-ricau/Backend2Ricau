import { Router } from "express";
import Cart from "../models/cart.model.js";

const router = Router();

router.post("/", async (req, res) => {
  const cart = await Cart.create({ products: [] });
  res.json(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate("products.product");
  res.json(cart);
});

router.put("/:cid", async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(
    req.params.cid,
    { products: req.body },
    { new: true }
  );
  res.json(cart);
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);

  const item = cart.products.find(
    p => p.product.toString() === req.params.pid
  );

  if (item) {
    item.quantity = req.body.quantity;
  }

  await cart.save();
  res.json(cart);
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);

  cart.products = cart.products.filter(
    p => p.product.toString() !== req.params.pid
  );

  await cart.save();
  res.json(cart);
});

router.delete("/:cid", async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.cid, { products: [] });
  res.json({ status: "cleared" });
});

export default router;
