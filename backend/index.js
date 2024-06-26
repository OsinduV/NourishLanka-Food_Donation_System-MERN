import cors from 'cors';
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import frpRoutes from './fundRaising/routes/frp.route.js'
import frpDonationRoutes from './fundRaising/routes/frpdonation.route.js'
import cookieParser from 'cookie-parser'

import schedulesRoutes from './Volunteer/route/schedules.route.js'
import  volunteerRoutes from  './Volunteer/route/volunteer.route.js'

import foodbank from './Foodbank/routes/foodbank.route.js'

import ReicipientpostRoutes from './CommunityManagement/routes/recipientpostroute.js'
import FoodRequestRoutes from './CommunityManagement/routes/foodrequest.js'

import inventoryRoutes from './InventoryManagement/routes/inventorys.js'

import eventRoutes from './Event/routes/event.route.js';
import donationRoutes from './Event/routes/donation.route.js';
import fooddriveRoutes from './Event/routes/fooddrive.route.js';

import commentRoutes from './Ratings and Reviews_b/routes/comment.route.js';

import path from 'path';



dotenv.config()
mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log ('Database is connected ..')
}).catch(err => {
    console.log(err)
})

const __dirname = path.resolve();

const app = express();

// app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH']}))

app.use(express.json());
app.use(cookieParser());


app.use(cors());

app.listen(3500 ,() =>{
    console.log  ('Server is runnning on port 3500 !!')

})

app.use('/api/volunteer',volunteerRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth',authRoutes)


//fund raising
app.use('/api/frp', frpRoutes)
app.use('/api/frpdonation', frpDonationRoutes)


app.use('/api/schedules',schedulesRoutes);



app.use('/api/post',ReicipientpostRoutes)
app.use('/api/foodrequest',FoodRequestRoutes)
app.use('/api/event', eventRoutes); 
app.use('/api/donation', donationRoutes); 
app.use('/api/fooddrive', fooddriveRoutes); 

app.use('/api/foodbank',foodbank);


// rating and reviews 
app.use('/api/comment', commentRoutes);



//inventory
app.use('/api/inventorys', inventoryRoutes);


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
  
})


