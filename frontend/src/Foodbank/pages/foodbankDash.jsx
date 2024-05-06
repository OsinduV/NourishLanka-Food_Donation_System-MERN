import { Button, Card, Progress } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Foodbank from '../../../../backend/Foodbank/models/foodbank.model';
import { Link } from 'react-router-dom';
import { EditFoodBank } from '../components/updatefoodbank';

function FoodBankDashboard() {
  const [userFoodBanks, setUserFoodBanks] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  

  useEffect(() => {
    
    fetchUserFoodBanks();
  }, []);

  const fetchUserFoodBanks = async () => {
    try {
      const response = await fetch(`http://localhost:3500/api/foodbank/readUserFb?userID=${currentUser._id}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user food banks');
      }
      const data = await response.json();
      setUserFoodBanks(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching user food banks:', error);
    }
  };

  return (
    <div className='flex-auto min-h-screen '>
      <div className='flex flex-row justify-center'>
        <Link to='/foodbankhome'>
                      <Button outline gradientDuoTone="greenToBlue" className='ml-10 mt-1 mb-2'>
                          FoodBank Home
                      </Button>
        </Link>
        <Link to='/inventory-show'>
                      <Button outline gradientDuoTone="greenToBlue" className='ml-10 mt-1 mb-2'>
                          View Inventories
                      </Button>
        </Link>
      </div>
      <hr/>
      <div className='flex flex-row'>
          <Card className=' w-96 mt-3 ml-60' >
          {userFoodBanks.map((foodBank) => (
            <div key={foodBank._id}>
              <h3>Current Space in FoodBank</h3>
              <Progress progress={foodBank.currentspace} textLabel="Remaining" size="lg" labelProgress labelText />
            </div>
          ))}
        </Card> 
        <Card className=' w-48 mt-3 ml-96 h-20' >
          {userFoodBanks.map((foodBank) => (
            <div key={foodBank._id}>
              <h4>Status</h4>
              <h1 className='text-green-700 ml-10'>"{foodBank.status}"</h1>
            </div>
          ))}
        </Card> 
      </div>
               
  <Card className='mt-10 w-2/4 h-auto  ml-60'>
    <h1>Food Bank Dashboard</h1>
    <table>
      <tbody>
        
        <tr>
          <td><strong>Food Bank:</strong></td>
          <td>
            <ul>
              {userFoodBanks.map((foodBank) => (
                <li key={foodBank._id}>{foodBank.foodbankname}</li>
              ))}
            </ul>
          </td>
        </tr>
        {userFoodBanks.map((foodBank) => (
          <React.Fragment key={foodBank._id}>
            <tr>
              <td><strong>Address:</strong></td>
              <td>{foodBank.address}</td>
            </tr>
            <tr>
              <td><strong>Storage Space:</strong></td>
              <td>{foodBank.storagespace} sqft</td>
            </tr>
            <tr>
              <td><strong>Current Space:</strong></td>
              <td>{foodBank.currentspace} %</td>
            </tr>
            <tr>
              <td><strong>Opentime:</strong></td>
              <td>{foodBank.opentime} to {foodBank.closetime}</td>
            </tr>
            <tr>
              <td><strong>PhoneNo:</strong></td>
              <td>{foodBank.phoneno}</td>
            </tr>
            <tr>
              <td></td>
              <td>
              <EditFoodBank foodBankId={foodBank._id} />
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </Card>
  
</div>
  );
}

export default FoodBankDashboard;
