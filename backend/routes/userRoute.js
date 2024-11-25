import express from 'express'
import upload from '../middlewares/multer.js'
// paymentRazorpay,verifyRazorpay to be added in import 
import { registerUser,loginUser,getProfile,updateProfile ,bookAppointment,listAppointment,cancelAppointment} from '../controllers/userController.js' 
import authUser from '../middlewares/authUser.js'
const userRouter=express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

//userRouter.post('/payment-stripe', authUser, paymentStripe);
//userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
//userRouter.post('/verifyRazorpay',authUser,paymentRazorpay)
export default userRouter



