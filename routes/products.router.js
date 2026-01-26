import { Router } from "express";
import Product from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const filter = {};
  if (query) {
    if (query === "true" || query === "false") {
      filter.status = query === "true";
    } else {
      filter.category = query;
    }
  }

  const options = {
    limit: Number(limit),
    page: Number(page),
    sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
    lean: true
  };

  const result = await Product.paginate(filter, options);

  res.json({
    status: "success",
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage
      ? `/api/products?page=${result.prevPage}`
      : null,
    nextLink: result.hasNextPage
      ? `/api/products?page=${result.nextPage}`
      : null
  });
});

router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.get("/:pid", async (req, res) => {
  const product = await Product.findById(req.params.pid);
  res.json(product);
});

export default router;
