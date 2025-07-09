const express = require("express");
const productRouter = express.Router();
const ProductModel = require("../models/product");
const userAuth = require("../middlewares/auth");
const { validateProductData } = require("../utils/validation");
const { uploadToS3 } = require("../utils/aws");

productRouter.post("/product", userAuth, async (req, res) => {
  try {
    validateProductData(req);
    const { name, description, price } = req.body;
    const files = req.files;
    let productImageUrl;

    if (files && files.length > 0) {
      const fileBuffer = files[0]?.buffer;
      const fileName = files[0]?.originalname;
      productImageUrl = await uploadToS3(fileBuffer, fileName);
    }

    const result = {
      name,
      description,
      price,
      productImage: productImageUrl,
    };

    let productData = await ProductModel.create(result);

    res.status(201).json({
      message: `Data created successfully`,
      data: productData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

productRouter.get("/product", userAuth, async (req, res) => {
  try {
    const data = await ProductModel.find({isDeleted: false});
    return res.status(200).json({ status: true, message: "Product fetch successfully", data: data})
  } catch (err) {
    return res.status(500).json({status: false, message: err.message})
  }
});

module.exports = productRouter;
