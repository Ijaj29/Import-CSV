const mongoose = require("mongoose");

const policyCategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: "String",
    },
  },
  { timestamps: true }
);

const policyCategoryModel = mongoose.model("policycategory", policyCategorySchema);

module.exports = policyCategoryModel;
