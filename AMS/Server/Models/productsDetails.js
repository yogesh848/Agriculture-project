const ProductModel = require('./productModel'); 


exports.getProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.find({});
    res.json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getSingleProduct = async (req, res, next) => {   
  try {
    console.log(req.params.id, 'ID');
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in your ID",
    });
  }
};
