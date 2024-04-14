import { Button, FileInput, Select, TextInput, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DonationRequest() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [imageUploadProgress1, setImageUploadProgress1] = useState(null);
  const [imageUploadProgress2, setImageUploadProgress2] = useState(null);
  const [imageUploadProgress3, setImageUploadProgress3] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUpdloadImage = async (file, setImageUploadProgress) => {
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

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Hosting Donation Event Request Form</h1>
      <form className='flex flex-col gap-4 mb-20'>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        Event title 
               <TextInput
                 type='text'
                 placeholder='Title'
                 required
                 id='eventtitle'
                 className='flex-1 ml-9'
               />


                <Select>
                 <option value='donationevent'>Donation Event</option>
                </Select>
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Donor ID 
              <TextInput
                 type='text'
                 placeholder='Requesting Donor ID'
                 required
                 icon={FaUserCheck}
                 id='dnid'
                 className='flex-1 ml-11'
               />
      </div>

      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Donor Email
              <TextInput
                 type='text'
                 placeholder='Requesting Donor Email'
                 required
                 icon={MdEmail}
                 id='donoremail'
                 className='flex-1 ml-5'
               />
      </div>

      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Date 
              <TextInput
                 type='text'
                 placeholder='dd/mm/yyyy'
                 required
                 icon={BsCalendar2DateFill}
                 id='eventdate'
                 className='flex-1 ml-7'
               />
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Time 
              <TextInput
                 type='text'
                 placeholder='Expected starting time'
                 required
                 icon={IoIosTime}
                 id='eventtime'
                 className='flex-1 ml-7'
               />
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Location
              <TextInput
                 type='text'
                 placeholder='Event location'
                 required
                 icon={FaLocationDot}
                 id='eventlocation'
                 className='flex-1'
               />
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Description
              <Textarea
                  type='text'
                  placeholder=' Provide a detailed description of the event, including its purpose, goals, and any specific activities planned.'
                  id='eventdescription'
                  rows='5'
                >
              </Textarea>
        </div>

        Financial Stability
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
           Your Event Budget
           <Select className='w-full ml-12'>
                 <option value='nobudget'>Select Your Event Budget</option>
                 <option value='nobudget'>less than Rs.30000.00</option>
                 <option value='nobudget'>less than Rs.60000.00</option>
                 <option value='nobudget'>greater than Rs.60000.00</option>
            </Select>
          </div>
        
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          Proof of financial documents
          <div className='flex gap-4 items-center justify-between border-2 w-full'>
              <FileInput
                type='file'
                accept='image1/*'
                onChange={(e) => setFile1(e.target.files[0])}
              />

              <Button
                type='button'
                gradientDuoTone='greenToBlue'
                size='sm'
                outline
                onClick={() => handleUpdloadImage(file1, setImageUploadProgress1)}
                disabled={imageUploadProgress1 || !file1}
              >
              {imageUploadProgress1 ? (
                   <div className='w-16 h-16'>
                      <CircularProgressbar
                        value={imageUploadProgress1}
                        text={`${imageUploadProgress1 || 0}%`}
                      />
                  </div>
            ) : (
              'Upload Bank Statement'
            )}
              </Button>
            </div>

          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
          </div>
<br></br>
          Event Sacle
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              No. of attendees expecting
              <TextInput
                 type='number'
                 placeholder='No of attendees'
                 required
                 id='attendees'
                 className='flex-1 mr-5'
               />

              No. of Volunteers needed
              <TextInput
                 type='number'
                 placeholder='No of volunteers'
                 required
                 id='volunteers'
                 className='flex-1'
               /> 
      </div>

      <div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
        Event Proposal/Plan
        <div className='flex gap-4 items-center justify-between border-2 w-full ml-6'>
              <FileInput
                type='file'
                accept='image2/*'
                onChange={(e) => setFile2(e.target.files[0])}
              />

              <Button
                type='button'
                gradientDuoTone='greenToBlue'
                size='sm'
                outline
                onClick={() => handleUpdloadImage(file2, setImageUploadProgress2)}
                disabled={imageUploadProgress2 || !file2}
              >
              {imageUploadProgress2 ? (
                   <div className='w-16 h-16'>
                      <CircularProgressbar
                        value={imageUploadProgress2}
                        text={`${imageUploadProgress2 || 0}%`}
                      />
                  </div>
            ) : (
              'Upload Event Proposal'
            )}
              </Button>
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
          </div>

          <div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
        Partnership Agreements
        <div className='flex gap-4 items-center justify-between border-2 w-full'>
              <FileInput
                type='file'
                accept='image3/*'
                onChange={(e) => setFile3(e.target.files[0])}
               
              />

              <Button
                type='button'
                gradientDuoTone='greenToBlue'
                size='sm'
                outline
                onClick={() => handleUpdloadImage(file3, setImageUploadProgress3)}
                disabled={imageUploadProgress3 || !file3}
              >
              {imageUploadProgress3 ? (
                   <div className='w-16 h-16'>
                      <CircularProgressbar
                        value={imageUploadProgress3}
                        text={`${imageUploadProgress3 || 0}%`}
                      />
                  </div>
            ) : (
              'Upload Partnership Agreement'
            )}
              </Button>
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
          </div>

          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Conernrs or Requests
              <Textarea
                  type='text'
                  placeholder=' Any concerns or requests?'
                  id='conserns'
                  rows='8'
                >
              </Textarea>

          </div>
          <Button type='submit' gradientDuoTone='greenToBlue'>
          Send Request
        </Button>
      </form>
    </div>
  )
}
