const Firm = require("../models/Firms")
const Vendor = require("../models/Vendor")

const multer = require("multer")



// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname + file.originalname); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });




const addFirm = async (req, res) => {
    try {
        const { firmName, area, categrory, region, offer } = req.body

        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId)
       if(!vendor){
        res.status(401).json({message : "Invalid _id"})
       }



        const firm = new Firm({
            firmName,
            area,
            categrory,
            region,
            offer,
            image,
            vendor: vendor._id


        })
        const savedFirm = await firm.save()
        vendor.firm.push(savedFirm)
        await vendor.save()


        return res.status(400).json({sucess : "firm added scuccessfully"})


    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server")


    }
}


const firmDeleteById = async (req, res) =>{

   try {
        const firmId = req.params.firmId
        const deleteFirm = await Firm.findByIdAndDelete(firmId)
        if(!deleteFirm) {
            return res.status(404).json({error : "no product found"})
        }
         res.status(400).json("product delete sucessfull")
    } catch (error) {
         console.error("Error in Product:", error); // ✅ Better logging
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}

module.exports = {addFirm : [upload.single('image'),addFirm],firmDeleteById}