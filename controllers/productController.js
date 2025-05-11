const path = require("path"); // ✅ Required for path.extname
const multer = require("multer");
const Product = require("../models/Product");
const Firm = require("../models/Firms");

// ✅ Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // ✅ Corrected
        cb(null, Date.now() + ext); // ✅ Generating a unique filename
    }
});

const upload = multer({ storage: storage });

// ✅ Controller to Add Product
const addProduct = async (req, res) => {
    try {
        const { name, price, categeory, bestseller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;

        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No Firm Found!" }); // ✅ Better status code
        }

        const product = new Product({
            name,
            price,
            categeory,
            bestseller,
            description,
            image,
            firm: firm._id
        });

        const savedProduct = await product.save();

        // Add only the product ID to the firm’s products array
        firm.products.push(savedProduct._id);
        await firm.save();

        // ✅ Send successful response
        res.status(201).json({
            message: "Product added successfully",
            product: savedProduct
        });

    } catch (error) {
        console.error("Error in addProduct:", error); // ✅ Better logging
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getProductByFrim = async (req, res) => {
    try {
        const firmId = req.params.firmId

        const firm = await Firm.findById(firmId)


        if (!firm) {

            res.status(500).json({ error: "No firm found" });
        }
        const resturantName = firm.firmName

        const products = await Product.find({ firm: firmId })
        res.status(400).json({resturantName, products})



    } catch (error) {
        console.error("Error in firmProduct:", error); // ✅ Better logging
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const productDeleteById = async (req, res) =>{

   try {
        const productId = req.params.productId
        const deleteProduct = await Product.findByIdAndDelete(productId)
        if(!deleteProduct) {
            return res.status(404).json({error : "no product found"})
        }
         res.status(400).json("product delete sucessfull")
    } catch (error) {
         console.error("Error in Product:", error); // ✅ Better logging
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}

// ✅ Exporting as middleware array (multer + controller)
module.exports = {
    addProduct: [upload.single('image'), addProduct,], getProductByFrim,productDeleteById
};
