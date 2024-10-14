
import jwt from 'jsonwebtoken';
//user Authentication Middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Debugging logs
    // console.log("Decoded Token:", token_decode);
    // console.log("Expected Admin Email:", `'${process.env.ADMIN_EMAIL}'`);  // Using single quotes to identify spaces
    // console.log("Type of decoded email:", typeof token_decode.email); 
    // console.log("Type of admin email:", typeof process.env.ADMIN_EMAIL); 

    // Compare emails after trimming to avoid whitespace issues
    // if (token_decode.email.trim() !== process.env.ADMIN_EMAIL.trim()) {
    //   return res.json({ success: false, message: 'Not Authorized Login Again' });
    // }
    req.body.userId=token_decode.id

    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
