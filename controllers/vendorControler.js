const Vendor = require("../models/Vendor")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")


dotenv.config()
const secreteKey = process.env.MySecreteKey
const vendorRegister = async(req,res) =>{
    const {username, email,password } = req.body

    try{
        const vendorEmail = await Vendor.findOne({email})

        if (vendorEmail) {
            return res.status(400).json("Email already exist")
        }
       const hashedPassword = await bcrypt.hash(password,10)

       const newVendor = new Vendor({
        username,
        email,
        password:hashedPassword
        
    })
       await newVendor.save()
       res.status(201).json({message : "Vendor successfully register"})
       console.log("Registerd")


    }
    catch(error){
    
        res.status(500).json({error: "Internal server errror"})
        console.log(error)//check the actual error

    }

}


const vendorLogin = async (req,res) =>{4
    const {email, password} = req.body


    try{
         const vendor = await Vendor.findOne({ email });

        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({vendorId :vendor._id},secreteKey, {expiresIn : "1h"})
        console.log(token)

        return res.status(200).json({ success: "Login successful",token });
       

    }
    catch(error){
        res.status(500).json({error : "Internal Error"})
        console.log(error)

    }
}


const getAllVendors = async (req,res) =>{
    try {
        const vendors = await Vendor.find().populate("firm")
        res.json({vendors})

        
    } catch (error) {
        console.log(error)
        console.log({error : "not gettting all the vendors data"})
    }
}

const getSingleVendor = async (req, res) =>{

    const vendorId = req.params._id

    try {
        const vendor = await Vendor.findById(vendorId)
        if(!vendor) {
           return  res.status(401).json({error : "vendor not found"})
        }
        res.json({vendor})
        
    } catch (error) {
        console.log(error)

        res.status(500).json({error : "single vendor issue"})
    }

}

module.exports =  {vendorRegister, vendorLogin, getAllVendors,getSingleVendor} //