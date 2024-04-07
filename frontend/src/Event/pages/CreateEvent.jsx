import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable,} from 'firebase/storage';
import { app } from '../../firebase.js';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";

export default function CreateEvent() {
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
    }
    catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/event/create', {
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
        navigate(`/event/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create an event</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              {/* title bar */}
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

              {/* dropdown */}
             <Select
                         onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
             >
                 <option value='uncategorized'>Select a category</option>
                 <option value='DonationEvent'>Donation event</option>
                 <option value='FoodDrive'>food drive</option>
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
                gradientDuoTone='purpleToBlue'
                size='sm'
                outline
                onClick={handleUpdloadImage}
                disabled={imageUploadProgress}>

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
           )}

              <TextInput
                 type='text'
                 placeholder='dd/mm/yyyy'
                 required
                 icon={BsCalendar2DateFill}
                 id='date'
                 className='flex-1'
                 onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
               />

             <TextInput
                 type='text'
                 placeholder='Expected starting time'
                 required
                 icon={IoIosTime}
                 id='time'
                 className='flex-1'
                 onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
               />

             <TextInput
                 type='text'
                 placeholder='Event location'
                 required
                 icon={FaLocationDot}
                 id='location'
                 className='flex-1'
                 onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
               />

            <TextInput
                 type='text'
                 placeholder='Organizing donor ID'
                 required
                 icon={FaUserCheck}
                 id='donorid'
                 className='flex-1'
                 onChange={(e) =>
                  setFormData({ ...formData, donorid: e.target.value })
                }
               />


              {/* dropdown */}
             <Select
                         onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
             >
                 <option value='nostatus'>Event status</option>
                 <option value='approved'>Approved</option>
                 <option value='processing'>Processing</option>
                 <option value='ongoing'>Ongoing</option>
            </Select>

            
            <ReactQuill 
              theme="snow"
              placeholder='write your descritption....'
              className='h-72 mb-12'
              required
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
              />

        <Button type='submit' gradientDuoTone='purpleToPink'>
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