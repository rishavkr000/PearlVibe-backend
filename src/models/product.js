const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    productImage: {
        type: String,
        trim: true,
        default: "https://www.legrand.com.vn/modules/custom/legrand_ecat/assets/img/no-image.png"
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    deletedAt: {
        type: Date,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
