import AdminUser from "../model/AdminUser.js"
import User from "../model/User.js"

export const LoginAdmin = async (req,res) =>{

  try {
    
    if(!req.body.email || !req.body.password) return res.status(401).json("Please input all fields")

    const adminEmail = await AdminUser.findOne({email: req.body.email})
    if(!adminEmail) return res.status(401).json("Admin not found")

    if(adminEmail.password !== req.body.password) return res.status(401).json("Incorrect Password!")

    const { password, ...others } = adminEmail._doc
    res.status(200).json({ ...others })
    
  } catch (error) {
    console.log(error)
  }

}

export const LoginUser = async (req,res) =>{
  if(!req.body.email || !req.body.password) return res.status(401).json("Please input all fields")

  const user = await User.findOne({ email: req.body.email})
  if(!user) return res.status(401).json("User not found")

  if(user.password !== req.body.password) return res.status(401).json("Incorrect Password!")

  const { password, ...others } = user._doc
    res.status(200).json({ ...others })

}