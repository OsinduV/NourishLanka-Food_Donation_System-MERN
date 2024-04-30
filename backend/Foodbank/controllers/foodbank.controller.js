import Foodbank from '../models/foodbank.model.js';

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
  //read one food bank data

export const readFb = async (req, res) => {
  const { id } = req.params; 
  
  try {
    const foodbank = await Foodbank.findById(req.params.id);
    if (!foodbank) {
      return res.status(404).json({ message: 'Food bank not found' });
    }
    res.status(200).json(foodbank);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  //read foodbanks with pending
  export const pendingfb = async (req, res) => {
    const { status } = req.query;
    try {
        // Fetch only the approved food banks with required fields
        const foodbanks = await Foodbank.find({ status })
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
        // Fetch only the approved food banks with required fields
        const foodbanks = await Foodbank.find({ district, status: 'approved' })
            .select('foodbankname currentspace address phoneno opentime closetime email')
            .exec();
        res.status(200).json(foodbanks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


  //Status approved
  export const statusapprove = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedFoodbank = await Foodbank.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

        if (!updatedFoodbank) {
            return res.status(404).json({ message: 'Food bank not found' });
        }

        res.status(200).json(updatedFoodbank);
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//Status reject
export const statusreject =async (req, res) => {
  const { id } = req.params;

  try {
      const updatedFoodbank = await Foodbank.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });

      if (!updatedFoodbank) {
          return res.status(404).json({ message: 'Food bank not found' });
      }

      res.status(200).json(updatedFoodbank);
  } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

