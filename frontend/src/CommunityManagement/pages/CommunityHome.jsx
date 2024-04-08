
import{AiOutlineSearch} from 'react-icons/ai'//icons
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import RecipientPostCard from '../components/RecipientPostCard';
import CallToAction from '../components/CallToAction';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function CommunityHome() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        setPosts(data.posts);
      };
      fetchPosts();
    }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Are you a person who is need of food?</h1>
       
        <p className='text-gray-500 text-xs sm:text-sm'>
        
"Welcome to our compassionate hub, where every click makes a difference! Our Community Management platform in Sri Lanka is not just about food assistance—it's about fostering hope and unity in the face of food insecurity.
In a world where every meal counts, we're here to make sure no one goes hungry. Our innovative platform empowers individuals and families facing food insecurity to customize their needs, ensuring dignity and respect for every request.
        </p>
    
      
        
         
        <div class="flex justify-center">
          <div class="p-7">
        <img src="https://www.heraldmalaysia.com/uploads/news/2018/8/16149695011533117175.jpg" class="rounded-lg" />
        </div>
      </div>

        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction/>
    </div>

     
   
    </div>
  );
}
  

