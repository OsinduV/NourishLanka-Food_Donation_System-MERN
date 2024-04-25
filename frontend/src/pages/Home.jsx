import React from 'react';
import { Button, Card } from 'flowbite-react';

export default function Home() {
  return (
    <div className='md:px-12 p-4 max-w-screen-2xl mx-auto mt-20'>
    <div>
        <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10'>
            <div className='flex flex-col sm:flex-row p-3  justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
              
                {/* Banner content */}
                <div className='md:w-4/5 text-center'>
                    <h2 className='md:text-6xl text-4xl font-bold mb-6 leading-relaxed'>Nourish Lanka</h2>
                    <p className='mb-8'>Nourish Lanka is a compassionate food donation platform dedicated to addressing food insecurity and hunger-related issues in Sri Lanka. At Nourish Lanka, we believe that every individual deserves access to nutritious meals and the basic necessity of food. With this ethos at our core, we've established a platform that serves as a bridge between those in need and generous donors willing to make a difference.</p>
                 </div>
                 </div>
                 </div>
             </div>
             {/* Add some cards */}
      <div className="flex gap-6 mt-8">
        <Card className="w-full md:w-1/3">
          <div className="card-content">
            <img src="https://t3.ftcdn.net/jpg/04/96/08/02/360_F_496080280_i73DdGNGBWxi8vIeYTtd5htd8CGbtNn9.jpg" alt="Card 1" className="card-image" />
            <h3 className="text-lg font-bold mb-2 mt-3 text-center">Our Mission</h3>
            <p className='text-center'>Our mission at Nourish Lanka is to alleviate food insecurity and foster community by providing vital food support to individuals and families facing hunger in Sri Lanka. We aim to address the urgent need for nutritious meals, especially in vulnerable communities, through meaningful action and direct connections between those in need and generous donors.</p>
          </div>
        </Card>
        <Card className="w-full md:w-1/3">
          <div className="card-content">
            <img src="https://t3.ftcdn.net/jpg/04/98/47/60/360_F_498476030_i2GPXTuynMyhDwWUQ9wsBofP5peZoo0h.jpg" alt="Card 2" className="card-image" />
            <h3 className="text-lg font-bold mb-2 mt-3 text-center">Our Vision</h3>
            <p className='text-center'>Our vision is to create a future where no one in Sri Lanka has to worry about where their next meal will come from. We envision a community where everyone has access to the nourishment they need to thrive, fostering resilience and well-being. Through collective action and support, we strive to build a stronger, more equitable society for all.</p>
          </div>
        </Card>
        <Card className="w-full md:w-1/3">
          <div className="card-content">
            <img src="https://as2.ftcdn.net/v2/jpg/05/03/64/55/1000_F_503645509_UmG9HgW3DHNkaWVaTiOD1ukzYFHvu8Lg.jpg" alt="Card 3" className="card-image" />
            <h3 className="text-lg font-bold mb-2 mt-3 text-center">Our Goal</h3>
            <p className='text-center'>Our goal is to build a robust and sustainable platform that efficiently matches individuals experiencing food insecurity with donors eager to help. We aim to expand our reach and impact, ensuring that assistance reaches where it's needed most across Sri Lanka. By fostering a sense of community and collaboration, we aspire to make a lasting difference in the fight against hunger.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}