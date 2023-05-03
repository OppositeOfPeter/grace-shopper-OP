const express = require("express");
const app = express.Router();
const { Product } = require("../db");

// (api/products)
app.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

// (api/products/:id)
app.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.sendStatus(404);
    }
  } catch (ex) {
    next(ex);
  }
});

// (api/products/:id)
app.post("/:id", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

// (api/products/:id)
app.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.send(await product.update(req.body));
    } else {
      res.sendStatus(404);
    }
  } catch (ex) {
    next(ex);
  }
});

// (api/products/:id)
app.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (ex) {
    next(ex);
  }
});

// (api/products/:id)
app.get("/reviews", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.send(await product.getReviews());
    } else {
      res.sendStatus(404);
    }
  } catch (ex) {
    next(ex);
  }
});

// (api/products/:id)
app.post("/reviews", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const review = await product.createReview(req.body);
      res.status(201).send(review);
    } else {
      res.sendStatus(404);
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
