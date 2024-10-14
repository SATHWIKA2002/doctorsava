
/////////////////////////////////////////////////////////////////////////////////////////////
import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
// API for adding doctor 
const addDoctor = async (req, res) => {
   try {
   //We will get these data from the request
  const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

    // Send this data using form data format so we need middlewares
 const imageFile = req.file;
console.log({name, email, password, speciality, degree, experience, about, fees, address},imageFile)
    // Check if required fields are missing
  if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
  return res.json({ success: false, message: "Missing Details" });
   }

    // Validating email format 
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validating strong password 
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hashing doctor password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary 
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;
    const doctorData={
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
    }
    const newDoctor=new doctorModel(doctorData)
    await newDoctor.save()

    res.json({success:true,message:"Doctor Added"})

 
 } 
  catch (error) {
    // Handle errors
    console.log(error)
    res.json({success:false,message:error.message})
} };
//API FOR ADMIN LOGIN
const loginAdmin=async(req,res)=>{
  try{
   const {email,password}=req.body


if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
//const token =jwt.sign(email+password,process.env.JWT_SECRET)



// Generate a JWT token with the admin email (you can add more data if necessary)
//const token = jwt.sign( {email} , process.env.JWT_SECRET);
const token = jwt.sign( {email} , process.env.JWT_SECRET);



res.json({success:true,token})


}
else{
  res.json({success:false,message:"Invalid credentials"})
}


  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }

} 

//API TO GET DOCTORS LIST FOR ADMIN PANEL
const allDoctors=async(req,res)=>{
  try{
const doctors=await doctorModel.find({}).select('-password')
res.json({success:true,doctors})
  }
  catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
 
}


export { addDoctor ,loginAdmin ,allDoctors};




// const addDoctor = async (req, res) => {
//   try {
//   //We will get these data from the request
//  const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

//    // Send this data using form data format so we need middlewares
// const imageFile = req.file;
//   }
//   catch(error){

//     }  }
//     export {addDoctor}