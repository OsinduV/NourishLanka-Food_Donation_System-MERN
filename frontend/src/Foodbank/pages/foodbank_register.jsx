import { Alert, Button, Label, Spinner, TextInput, Select } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

export default function foodbank_register() {
  const [formData, setFormData] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/foodbank/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      setRegistrationSuccess(true);
      navigate('/foodbankhome');
    }
  };

  return (
    <div className='min-h-screen mt-16'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1' >
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-300 to-green-400 rounded-lg text-white'>
           Nourish 
            </span>
            Lanka
          </Link>
          <p className='text-xl mt-3 text-green-950 dark:text-white'>
            FOODBANK REGISTRATION
          </p>
          <p className='text-sm mt-8 text-green-800 dark:text-green-100'>
          "Welcome to the Register Food Bank page! <br/><br/>Here, you can register your food bank to become 
          a part of our growing network dedicated to combating food insecurity. By filling out the form,
           you'll be providing essential details about your food bank, including its address, location, operating hours,
            and the area it serves. Once registered, your food bank will be accessible to donors and recipients alike,
           fostering a community-driven effort to ensure no one goes hungry.<br/><br/> Thank you for joining us in the fight against hunger!"
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
        <form className='flex flex-col gap-4'onSubmit={handleSubmit} >
            <div>
              <Label value='FoodBank Name' /> 
              <TextInput
                required
                type='text'
                placeholder='Eg: foodbank colombo'
                id='foodbankname'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Storage Space' /> 
              <TextInput
                required
                type='text'
                placeholder='Eg: 500 sqfeets'
                id='storagespace'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Address' /> 
              <TextInput
                required
                type='text'
                placeholder='Eg: 123,hill street,colombo 02'
                id='address'
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md">
            <div className="mb-2 block">
              <Label  value="District" />
            </div>
            <Select id="district" onChange={handleChange} required>
              <option value="" defaultValue>Select your district</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Kandy">Kandy</option>
              <option value="Matale">Matale</option>
              <option value="Nuwara Eliya">Nuwara Eliya</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Hambantota">Hambantota</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Kilinochchi">Kilinochchi</option>
              <option value="Mannar">Mannar</option>
              <option value="Mullaitivu">Mullaitivu</option>
              <option value="Vavuniya">Vavuniya</option>
              <option value="Puttalam">Puttalam</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Polonnaruwa">Polonnaruwa</option>
              <option value="Badulla">Badulla</option>
              <option value="Monaragala">Monaragala</option>
              <option value="Ratnapura">Ratnapura</option>
              <option value="Kegalle">Kegalle</option>
              <option value="Matale">Matale</option>
              <option value="Trincomalee">Trincomalee</option>
              <option value="Batticaloa">Batticaloa</option> 
            </Select>

          </div>
            <div>
              <Label value='Email' />
              <TextInput
                required
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Telephone Number" />
              <TextInput
                type="tel"
                placeholder="Eg: 0112345678"
                id="phoneno"
                onChange={handleChange}
                pattern="0\d{9}"
                title="Please enter a valid telephone number"
                required
              />
            </div>
            <Label value="Open & Close time" />
            <div className='flex gap-5'>
              <Label value="Open" />
              <TextInput
                type="time"
                id="opentime"
                onChange={handleChange}
                title="enter open time"
                required
              />
              <Label value="Close" />
              <TextInput
                type="time"
                id="closetime"
                onChange={handleChange}
                title="enter close time"
                required
              />
            </div>
            <div>
              <Label value="Description" />
              <TextInput 
                id="description" 
                onChange={handleChange}
                type="text" 
                sizing="lg" 
              />
            </div>
            <Button gradientDuoTone='greenToBlue' type='submit'>
              Register FoodBank
            </Button>  
          </form>
          {/* Alert for registration success */}
          {registrationSuccess && (
            <Alert color='success' onDismiss={() => setRegistrationSuccess(false)} className='mt-4'>
              <span className='font-medium'>Registration successful!</span> 
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}