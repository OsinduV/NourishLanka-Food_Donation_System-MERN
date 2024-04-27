import React, { useEffect } from 'react'
import {Alert, Button, FileInput, Select, TextInput, } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import{app} from '../../firebase'
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdateStatus() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});//save to the form
  const [publishError, setPublishError] = useState(null);
  const {foodrequestId} = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() =>{
    try{
     const fetchFoodRequests = async () =>{
        const res = await fetch(`/api/foodrequest/getfoodrequests?foodrequestId=${foodrequestId}`);
        const data = await res.json();
     if(!res.ok){
        console.log(data.message);
        setPublishError(data.message);
        return;
     }
     if(res.ok){
        setPublishError(null);
        setFormData(data.foodrequests[0]);
     }
     };

     fetchFoodRequests();
    }catch(error){
        console.log(error.message)
    }

  },[foodrequestId]);

  const handleUpdloadImage = async () => {//save the image in firebase
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const file1Name = new Date().getTime() + '-' + file.name;//add file name at the top
      const storageRef = ref(storage, file1Name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;//image upload progress bar
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');//error messages
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
        const res = await fetch(`/api/foodrequest/updatefoodrequeststatus/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/foodrequest/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className='relative flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
    
   
  <div className='container mx-auto'>
  <h1 className='text-center text-3xl my-7 font-semibold'>Update Food Request Status</h1>
  <div className='text-center top-0 left-0 bg-red-500 text-white px-3 py-1 rounded-full font-bold'>Current Status -{formData.status}</div>
  <h1 className='text-3xl mt-3 p-3 text-center font-semibold max-w-2xl mx-auto lg:text-2xl'>Food Request ID - {formData.foodrequestId}</h1>
  <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
  <div >
            <div className='flex flex-col gap-4 sm:flex-row justify-between font-semibold mt-10 mb-10 text-lg'>
             Status of the Food Request
                <Select className='w-full ml-12'
                  onChange={(e) =>
                   setFormData({ ...formData, status: e.target.value })
                }
                value={formData.status}
                 >
                    <option value='Pending'>Pending</option>
                    <option value='Approved'>Approved</option>
                   <option value='Declined'>Declined</option>
                   <option value='Published'>Published</option>
                   
                </Select>
              </div>
          </div>
    
    
       
    <Button
      type='submit'
      gradientDuoTone='greenToBlue'
    >
      Edit the Status of the Food Request
    </Button>
    {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
  </form>
</div>






     
      </div>

  );
  
}
