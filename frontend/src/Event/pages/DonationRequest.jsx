import { Alert, Button, FileInput, Modal, Select, TextInput, Textarea } from 'flowbite-react'
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
import { useNavigate } from 'react-router-dom';

export default function DonationRequest() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [imageUploadProgress1, setImageUploadProgress1] = useState(null);
  const [imageUploadProgress2, setImageUploadProgress2] = useState(null);
  const [imageUploadProgress3, setImageUploadProgress3] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(formData);

  const navigate = useNavigate();

  const handleUpdloadImage = async (file, setImageUploadProgress, imageField) => {
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
          setFormData({ ...formData, [imageField]: downloadURL });
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
      const res = await fetch('/api/donation/createdonation', {
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
       navigate(`/donation/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <>
    <h1 className='text-5xl font-semibold my-7 dark:text-gray-300 text-center'>Empower Change:<br></br> Send Your Generous Donation Campaign!</h1>
    <p className='ml-12 mr-12'>
      Welcome to our donation request page! Before you proceed, please fill out the form below with all the necessary details about your donation event. Once you've completed the form, click the 'Send Request' button. After submitting your request, our team will review it promptly. You'll receive a notification informing you of the status of your request, whether it's approved or rejected. Thank you for your generosity and support in making a difference in our community!
    </p>
    <div className='p-3 max-w-4xl mx-auto min-h-screen'>
       <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 dark:bg-gray-800 mt-10">

      <form className='flex flex-col gap-4 mb-20 mr-10 ml-10 mt-10' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        Event title 
               <TextInput
                 type='text'
                 placeholder='Title'
                 required
                 id='eventtitle'
                 className='flex-1 ml-9'
                 onChange={(e) =>
                  setFormData({ ...formData, eventtitle: e.target.value })
                }
               />


                <Select
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                >
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
                 onChange={(e) =>
                  setFormData({ ...formData, dnid: e.target.value })
                }
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
                 onChange={(e) =>
                  setFormData({ ...formData, donoremail: e.target.value })
                }
               />
      </div>

      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Date 
              <TextInput
                 type='date'
                 required
                 id='eventdate'
                 className='flex-1 ml-7'
                 onChange={(e) =>
                  setFormData({ ...formData, eventdate: e.target.value })
                }
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
                 onChange={(e) =>
                  setFormData({ ...formData, eventtime: e.target.value })
                }
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
                 onChange={(e) =>
                  setFormData({ ...formData, eventlocation: e.target.value })
                }
               />
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Description
              <Textarea
                  type='text'
                  placeholder=' Provide a detailed description of the event, including its purpose, goals, and any specific activities planned.'
                  id='eventdescription'
                  rows='5'
                  onChange={(e) =>
                    setFormData({ ...formData, eventdescription: e.target.value })
                  }
                >
              </Textarea>
        </div>

        Financial Stability
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
           Your Event Budget
           <Select className='w-full ml-12'
                            onChange={(e) =>
                              setFormData({ ...formData, budget: e.target.value })
                            }
                    placeholder='Select Your Event'
           >
                 <option >Select Your Event Budget</option>
                 <option value='less than Rs.30000.00'>less than Rs.30000.00</option>
                 <option value='less than Rs.60000.00'>less than Rs.60000.00</option>
                 <option value='ngreater than Rs.60000.00'>greater than Rs.60000.00</option>
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
                onClick={() => handleUpdloadImage(file1, setImageUploadProgress1, 'image1')}
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
                 onChange={(e) =>
                  setFormData({ ...formData, attendees: e.target.value })
                }
               />

              No. of Volunteers needed
              <TextInput
                 type='number'
                 placeholder='No of volunteers'
                 required
                 id='volunteers'
                 className='flex-1'
                 onChange={(e) =>
                  setFormData({ ...formData,volunteers: e.target.value })
                }
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
                onClick={() => handleUpdloadImage(file2, setImageUploadProgress2, 'image2')}
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
                onClick={() => handleUpdloadImage(file3, setImageUploadProgress3, 'image3')}
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
                  onChange={(e) =>
                    setFormData({ ...formData, conserns: e.target.value })
                  }
                >
              </Textarea>

          </div>
          <Button type='submit' gradientDuoTone='greenToBlue' 
          onClick={() => {
            setShowModal(true);
          }} >
          Send Request
        </Button>

        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}

{/** 
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
          <h1 className=' text-black dark:text-gray-200 mb-4 mx-auto font-semibold'>
          Grateful for Your Giving: Thank You for Hosting a Donation Event!.</h1>
            <h2 className=' text-black dark:text-gray-200 mb-4'>
            Your Request is sent. The status of the event will be updated in your event Page.</h2>
            <div className='flex justify-center gap-4'>
              <Button onClick={() => setShowModal(false)} gradientDuoTone='greenToBlue'>
                Ok.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      */}
      </form>
      </div>
    </div>
    </>
  )
}
