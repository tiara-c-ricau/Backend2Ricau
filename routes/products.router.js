import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.post("/", async (req, res) => {
  const product = {
    id: Date.now().toString(),
    ...req.body
  };

  await productManager.addProduct(product);
  res.status(201).json({ status: "ok", product });
});

router.delete("/:id", async (req, res) => {
  await productManager.deleteProduct(req.params.id);
  res.json({ status: "deleted" });
});

export default router;
