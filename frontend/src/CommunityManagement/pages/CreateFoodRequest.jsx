import React from 'react'
import {Alert, Button, FileInput, Select, TextInput,Textarea } from 'flowbite-react';
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
import { useNavigate } from 'react-router-dom';


export default function CreateFoodRequest() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});//save to the form
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

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
      const res = await fetch('/api/foodrequest/createfoodrequest', {
        method: 'POST',
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
    <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Are you facing food scarcity, finding it challenging to access enough nourishing meals?</h1>
        <a href="dashboard?tab=myfoodrequests" className="absolute top-0 right-0 mt-4 mr-4">
            <Button type='button' gradientDuoTone='greenToBlue'>My Food Requests</Button>
        </a>
    </div>
    <p className='text-gray-500 text-xs sm:text-sm'>
        Submitting a food request through our form allows us to gather essential information about your specific food needs. By completing the form, you provide us with valuable details that enable us to better understand how we can assist you in accessing the food support you require. Your submission helps us tailor our assistance to best serve your needs.
    </p>
    
    
       <div className='container mx-auto'>
  <h1 className='text-center text-3xl my-7 font-semibold'>Send a Food Request</h1>
  <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
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
      />
      <Select
        required
        id='district'
        className='flex-1'
        onChange={(e) =>
          setFormData({ ...formData, district: e.target.value })
        }
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
      >
        <option value='uncategorized'>Select a Category</option>
        <option value='Low-Income Families'>Low-Income Families</option>
        <option value='Orphanages'>Orphanages</option>
        <option value='Elderly Care Homes'>Elderly care Homes</option>
        <option value='Schools'>Schools</option>
        


      </Select>

      <TextInput
        type='text'
        placeholder='Position of the Requester'
        id='position'
        className='flex-1'
        onChange={(e) =>
          setFormData({ ...formData,  position: e.target.value })
        }
        disabled={formData.category === 'Low-Income Families'}
      />    
    </div>

    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <TextInput
        type='number'
        placeholder='Population of the Orphanage'
        required
        id='porphange'
        className='flex-1'
        min="0"
        onChange={(e) =>
          setFormData({ ...formData,  porphanage: e.target.value })
        }
        disabled={formData.category !== 'Orphanages'}
      />
      <TextInput
        type='number'
        placeholder='Population of the Elderly Homes'
        required
        id='pelders'
        className='flex-1'
        min="0"
        onChange={(e) =>
          setFormData({ ...formData,  pelders: e.target.value })
        }
        disabled={formData.category !== 'Elderly Care Homes'}
      />
      <TextInput
        type='number'
        placeholder='Population of the School'
        required
        id='pschool'
        className='flex-1'
        min="0"
        onChange={(e) =>
          setFormData({ ...formData,  pschool: e.target.value })
        }
        disabled={formData.category !== 'Schools'}
      />
    </div> 
    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
  <TextInput
    type='number'
    placeholder='Household Size'
    required
    id='householdSize'
    className='flex-1'
    min='0'
    onChange={(e) => setFormData({ ...formData, householdSize: e.target.value })}
    disabled={formData.category !== 'Low-Income Families'}
    
  />
  <Select
    required
    id='incomeLevel'
    className='flex-1'
    onChange={(e) => setFormData({ ...formData, incomeLevel: e.target.value })}
    disabled={formData.category !== 'Low-Income Families'}
  >
    <option value=''>Select Income Level</option>
    <option value='10,000 - 15,000'>10,000 - 15,000</option>
    <option value='15,000-20,000'>15,000 -20,000</option>
    <option value='20,000 - 25,000'>20,000 - 25,000</option>

  </Select>
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
        disabled={formData.category !== 'Orphanages' && formData.category !== 'Schools'}
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
        disabled={formData.category !== 'Elderly Care Homes'}
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
        disabled={formData.category !== 'Elderly Care Homes'}
      />
    </div>
    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <TextInput
        type='email'
        placeholder='Gmail'
        id='email'
        className='flex-1 '
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        title="Enter a valid email address"
        onChange={(e) =>
          setFormData({ ...formData,  email: e.target.value })
        }
      />
      <TextInput
        type='text'
        placeholder='Address'
        id='address'
        className='flex-1'
        onChange={(e) =>
          setFormData({ ...formData,  address: e.target.value })
        }
      />
    </div>

    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
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
        />

          <TextInput
           type='text'
           placeholder='ZIP Code'
           id='zipcode'
           className='flex-1'
           onChange={(e) =>
          setFormData({ ...formData, zipcode: e.target.value })
            }
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
           disabled={imageUploadProgress || formData.category !== 'Low-Income Families'}
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
      Submit the Food Request
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
