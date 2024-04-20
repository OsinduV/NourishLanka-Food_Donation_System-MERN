import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import schedulesRoutes from './Volunteer/route/schedules.route.js'
import  volunteerRoutes from  './Volunteer/route/volunteer.route.js'

dotenv.config()
mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log ('Database is connected')
}).catch(err => {
    console.log(err)
})

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(5000 ,() =>{
    console.log  ('Server is runnning on port 5000 !!')
})

app.use('/api/volunteer',volunteerRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/schedules',schedulesRoutes);


app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message

    })

   

})
