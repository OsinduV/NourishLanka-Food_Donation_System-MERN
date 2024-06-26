import React from 'react'
import {Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
  import { app } from '../../firebase';
  import { useState } from 'react';
  import { CircularProgressbar } from 'react-circular-progressbar';
  import 'react-circular-progressbar/dist/styles.css';
  import{useNavigate} from 'react-router-dom';

export default function CreateRecipientPost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();
  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
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
      const res = await fetch('/api/post/create', {
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
        navigate(`/recipientpost/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a  Recipient Post</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput
          type='text'
          placeholder='Title'
          required
          id='title'
          className='flex-1'
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
        <option value='uncategorized'>Select a Category</option>
        <option value='Low-Income Families'>Low-Income Families</option>
        <option value='Orphanages'>Orphanages</option>
        <option value='Elderly Care Homes'>Elderly care Homes</option>
        <option value='Schools'>Schools</option>
         </Select>
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <TextInput
        type='text'
        placeholder='Name of the Orphanage / School/ Elderly Care Home'
        required
        id='name'
        className='flex-1'
        onChange={(e) =>
          setFormData({ ...formData, nameofplace: e.target.value })
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
      <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
      <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
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
              'Upload Image'
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
        placeholder='Write something...'
        className='h-72 mb-12'
        required
        onChange={(value) => {
          setFormData({ ...formData, content: value });
        }}
      />
      <Button type='submit' gradientDuoTone='greenToBlue'>
        Publish
      </Button>
      {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
    </form>
  </div>
  )
}
