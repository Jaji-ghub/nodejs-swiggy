const vendorController = require("../controllers/vendorControler")
const express = require("express")

const router = express.Router()

router.post("/Rgister", vendorController.vendorRegister)
router.post("/login", vendorController.vendorLogin)
router.get("/all-vendors",vendorController.getAllVendors)
router.get("/single-vendor/:_id",vendorController.getSingleVendor)

module.exports = router