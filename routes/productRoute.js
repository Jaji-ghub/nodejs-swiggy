const express = require("express");
const productControler = require("../controllers/productController");
const router = express.Router();

router.post("/add-product/:firmId", productControler.addProduct);
router.get("/products/:firmId", productControler.getProductByFrim);


router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(imagePath);
});


router.delete("/products-delete/:productId",productControler.productDeleteById)

module.exports = router;
