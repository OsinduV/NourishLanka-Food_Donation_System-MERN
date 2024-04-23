import React from 'react'
import { Button } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { Card } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';



export default function foodbank_home() {
  return (
    <div className='min-h-screen mt-2'>
        <div className="flex flex-row gap-2  w-100 ml-40 mr-auto mb-2 h-11">
        <p className='xl:text-xl m:text-lmt-1 mr-40 text-green-950 dark:text-white font-semibold '>
            FOODBANK REGISTRATION
          </p>
            <Link to='/foodbankreg'>
                <Button outline gradientDuoTone="greenToBlue">
                    Register Foodbank
                </Button>
            </Link>
            <Link to='/foodbankDash'>
                <Button outline gradientDuoTone="greenToBlue">
                    Dashboard      
                </Button>
            </Link>
            
            <Button outline gradientDuoTone="greenToBlue">
                Volunteer     
            </Button>
            <Button outline gradientDuoTone="greenToBlue">
                event host    
            </Button>
            <form>
                <div className="flex gap-2 mt-2">
                    <select id="location" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
                    <option value="" defaultValue>locate foodbank</option>
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
                    </select>
                
                <div className='mt-5'>
                
                </div>
                </div>
                </form>
                <Button outline gradientDuoTone="greenToBlue">Search</Button>

        </div>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-80">
            <Carousel>
                <img src="https://img.freepik.com/free-photo/front-view-food-provision-donation-with-boxes_23-2148732629.jpg?t=st=1713765286~exp=1713768886~hmac=77a77248b38e8bd7d32da0e8726667afe8e448dc078030ae8dcfcf4083f93de7&w=900" alt="..." />
                <img src="https://img.freepik.com/premium-photo/community-comes-together-donate-canned-food-those-need-generative-ai_561855-60944.jpg" alt="..." />
                <img src="https://img.freepik.com/free-photo/top-view-fresh-canned-food-donation_23-2148733827.jpg?t=st=1713765436~exp=1713769036~hmac=39be902bcacb781b8c8e63b6cc8ae33659b1a5621e433a79aa6db6543d3ede0e&w=740" alt="..." />
                <img src="https://img.freepik.com/free-psd/food-drive-template-design_23-2150910890.jpg?t=st=1713765196~exp=1713768796~hmac=7effe74d249cbb42210d62da2890a48cdb0d9deca58ccb4e5b626eaab3961364&w=1060" alt="..." />
                <img src="https://img.freepik.com/free-photo/high-angle-charity-box-being-prepared-donation_23-2148613126.jpg?t=st=1713765536~exp=1713769136~hmac=7cfea7bdb21706342c3eeec705c4311acc1e15d210f749f9b5bda40fad874616&w=826" alt="..." />
            </Carousel>
    </div>

    <div className='flex row mt-6 '>
        <Card  className="max-w-sm mt-3 ml-3 mx-auto">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Wanna Donate food ?
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
            Find the nearest food banks in your district with our location search feature. Simply select your district,
             and we'll display the closest food banks, making it easy for you to donate or receive assistance.
            </p>
        </Card>
        <Card className="max-w-sm mt-3 ml-3 mx-auto">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Wanna Volunteer yourself ?
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
            Explore our volunteer page to discover rewarding opportunities in your district. With 
            just a few clicks, you can find volunteer roles tailored to your interests and skills, 
            enabling you to contribute meaningfully to your community.
            </p>
        </Card>
        <Card className="max-w-sm mt-3 ml-3 mx-auto">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Wanna host an Event ?
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
            Discover the possibilities as an event host on our platform. From charity fundraisers to 
            community gatherings, unlock the resources to create impactful events that bring people 
            together for a cause. Join us in shaping memorable experiences and fostering community spirit.
            </p>
        </Card>
    </div>
            
    </div>
  )
}
