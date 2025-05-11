const express = require("express")
const firmController = require("../controllers/firmControler")
const verifyToken = require("../middleware/verifyToken")

const router = express.Router()

router.post("/add-firm",verifyToken,firmController.addFirm)

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(imagePath);
});



router.delete("/firm-delete/:firmId",firmController.firmDeleteById)


module.exports = router