// import jwt from 'jsonwebtoken'
// //ADMIN AUTHENTICATION MIDDLLEWARE
// const authAdmin=async(req,res,next)=>{
//     try{
//       const {atoken}=req.headers
//       if(!atoken){
//         return res.json({success:false,message:'Not Authorized Login Again'})
//       }
//       const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)
    
//       console.log("Decoded Token:", token_decode);
//       console.log("Expected Admin Email:", process.env.ADMIN_EMAIL);
//     if(token_decode!==process.env.ADMIN_EMAIL){
//         return res.json({success:false,message:'Not Authorized Login Again'})

//     }
//     next()
   
   
//     }
//     catch(error){
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }
// export default authAdmin

import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Debugging logs
    // console.log("Decoded Token:", token_decode);
    // console.log("Expected Admin Email:", `'${process.env.ADMIN_EMAIL}'`);  // Using single quotes to identify spaces
    // console.log("Type of decoded email:", typeof token_decode.email); 
    // console.log("Type of admin email:", typeof process.env.ADMIN_EMAIL); 

    // Compare emails after trimming to avoid whitespace issues
    if (token_decode.email.trim() !== process.env.ADMIN_EMAIL.trim()) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
