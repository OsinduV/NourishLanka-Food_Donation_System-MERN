import Foodbank from '../models/foodbank.model.js';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';


//register 
export const register = async(req, res) => {
    try {
      const newFoodbank = await Foodbank.create(req.body);
      res.status(201).json(newFoodbank);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //read all foodbanks registered
  export const readallfb =async (req, res) => {
    try {
      const foodbanks = await Foodbank.find();
      res.status(200).json(foodbanks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //update food bank
  export const updatefb=async (req, res) => {
    try {
      const updatedFoodbank = await Foodbank.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedFoodbank) {
        return res.status(404).json({ message: 'Food bank not found' });
      }
      res.status(200).json(updatedFoodbank);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //delete foodbank
  export const deletefb = async (req, res) => {
    try {
      const deletedFoodbank = await Foodbank.findByIdAndDelete(req.params.id);
      if (!deletedFoodbank) {
        return res.status(404).json({ message: 'Food bank not found' });
      }
      res.status(200).json({ message: 'Food bank deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //search foodbank
  export const searchfb = async (req, res) => {
    const { district } = req.query;
    try {
      const foodbanks = await Foodbank.find({ district,status: 'approved'},'foodbankname currentspace address phoneno opentime closetime');
      res.status(200).json(foodbanks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //approve function
  export const statuschange = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedFoodbank = await Foodbank.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!updatedFoodbank) {
        return res.status(404).json({ message: 'Food bank not found' });
      }
      //apikey-d65e529ac93ae002b829144ca6806a6d-19806d14-82a9affc
      //domain-sandbox4b259a36292e4029b4e05ac45026be2b.mailgun.org?

      // Send email notification to the relevant email of the food bank owner
      const auth = {
        auth: {
            api_key: 'd65e529ac93ae002b829144ca6806a6d-19806d14-82a9affc',
            domain: 'sandbox4b259a36292e4029b4e05ac45026be2b.mailgun.org?',
        },
        };
        const transporter = nodemailer.createTransport(mg(auth));
  
      const mailOptions = {
        from:'solicsregina0130@gmail.com',
        to: updatedFoodbank.email,
        subject: 'Nourish lanka FoodBank ',
        text:
            `Dear Food Bank Owner,
            \n\nYour food bank status has been updated to ${status}.
            \n\nBest regards,
            \nNourish lanka Team`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.status(200).json(updatedFoodbank);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
