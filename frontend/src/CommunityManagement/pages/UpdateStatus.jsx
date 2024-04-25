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
                   <option value='Declined'>Rejected</option>
                   <option value='Published'>Published</option>
                   
                </Select>
              </div>
          </div>
    
    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <TextInput
        type='text'
        placeholder='Name of the Requester'
        required
        id='name'
        className='flex-1'
        onChange={(e) =>
          setFormData({ ...formData, recipientname: e.target.value })
        }
        value={formData.recipientname}
      />
      <Select
        required
        id='district'
        className='flex-1'
        onChange={(e) =>
          setFormData({ ...formData, district: e.target.value })
        }
        value={formData.district}
      >
        <option value=''>Select  a District</option>
        <option value='Colombo'>Colombo</option>
        <option value='Gampaha'>Gampaha</option>
        <option value='Kalutara'>Kalutara</option>
        <option value='Kandy'>Kandy</option>
        <option value='Matale'>Matale</option>
        <option value='Nuwara Eliya'>Nuwara Eliya</option>
        <option value='Galle'>Galle</option>
        <option value='Matara'>Matara</option>
        <option value='Hambantota'>Hambantota</option>
        <option value='Jaffna'>Jaffna</option>
        <option value='Kilinochchi'>Kilinochchi</option>
        <option value='Mannar'>Mannar</option>
        <option value='Vavuniya'>Vavuniya</option>
        <option value='Mullaitivu'>Mullaitivu</option>
        <option value='Batticaloa'>Batticaloa</option>
        <option value='Ampara'>Ampara</option>
        <option value='Trincomalee'>Trincomalee</option>
        <option value='Kurunegala'>Kurunegala</option>
        <option value='Puttalam'>Puttalam</option>
        <option value='Anuradhapura'>Anuradhapura</option>
        <option value='Polonnaruwa'>Polonnaruwa</option>
        <option value='Badulla'>Badulla</option>
        <option value='Monaragala'>Monaragala</option>
        <option value='Ratnapura'>Ratnapura</option>
        <option value='Kegalle'>Kegalle</option>
      </Select>
    </div>
    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <Select
        required
        id='category'
        className='flex-1 '
        onChange={(e) =>
          setFormData({ ...formData,  category: e.target.value })
        }
        value={formData.category}
      >
        <option value='uncategorized'>Select a category</option>
        <option value='Low-Income Families'>Low-Income Families</option>
        <option value='Orphanages'>Orphanages</option>
        <option value='Elderly Individuals'>Elderly Individuals</option>
      </Select>
      
      < TextInput
        type='tel'
        placeholder='Contact Number'
        required
        id='contact'
        className='flex-1 '
        pattern="[0-9]{10}"
        title="Phone number must be 10 digits"
        onChange={(e) =>
          setFormData({ ...formData,  contactnumber: e.target.value })
        }
        value={formData.contactnumber}

      />
    </div>
    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <TextInput
        type='number'
        placeholder='Number of children'
        required
        id='children'
        className='flex-1'
        min="0"
        onChange={(e) =>
          setFormData({ ...formData,  nochildren: e.target.value })
        }
        value={formData.nochildren}
      />
      <TextInput
        type='number'
        placeholder='Number of males'
        required
        id='nomales'
        className='flex-1'
        min="0"
        onChange={(e) =>
          setFormData({ ...formData,  nomales: e.target.value })
        }
        value={formData.nomales}
      />
      <TextInput
        type='number'
        placeholder='Number of females'
        required
        id='nofemales'
        className='flex-1'
        min="0"
        onChange={(e) =>
          setFormData({ ...formData,  nofemales: e.target.value })
        }
        value={formData.nofemales}
      />
    </div>
    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <TextInput
        type='email'
        placeholder='Gmail'
        id='email'
        className='flex-1 '
        pattern="a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        title="Enter a valid email address"
        onChange={(e) =>
          setFormData({ ...formData,  email: e.target.value })
        }
        value={formData.email}
      />
      <TextInput
        type='text'
        placeholder='Address'
        id='address'
        className='flex-1'
        onChange={(e) =>
          setFormData({ ...formData,  address: e.target.value })
        }
        value={formData.address}
      />
    </div>
    <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}//one image [0]
          /> 
          <Button
            type='button'
            gradientDuoTone='greenToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
           
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              ' Upload Grama Niladhari Certificate for low-income familes'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )
        }
    <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder='Add special needs here...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
    
        />
       
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
