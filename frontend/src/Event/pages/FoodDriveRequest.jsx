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
import { CgWebsite } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";

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
      const res = await fetch('/api/fooddrive/createfooddrive', {
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
        navigate(`/fooddrive/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <>
    <h1 className='text-5xl font-semibold my-7 dark:text-gray-300 text-center'>Cultivate Hope:<br></br>Submit Your Nourishing Food Drive!</h1>
    <p className='ml-12 mr-12'>
      Welcome to our food drive request page! Before you proceed, please fill out the form below with all the necessary details about your fooddrive event. Once you've completed the form,
       click the 'Send Request' button. After submitting your request, our team will review it promptly. You'll receive a notification informing you of the status of your request, whether
        it's approved or rejected. Thank you for your generosity and support in making a difference in our community!
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
                 <option value='fooddrive'>Food Drive</option>
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
    
        <div className='flex flex-col gap-3 justify-between mt-5'>
            <div className='flex flex-col gap-1 sm:flex-row justify-between'>
             Are you hosting as a group?
            <Select
                className='w-full ml-12'
                onChange={(e) =>
            setFormData({ ...formData, group: e.target.value })
            }
            >
            <option value='nogrp'>Select</option>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
            </Select>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
         Organization name
        <TextInput
            type='text'
            placeholder='Name of the organization'
            required={formData.group === 'yes'} // Required only if hosting as a group
            icon={MdDriveFileRenameOutline}
            id='ogname'
            className='flex-1 ml-12'
            onChange={(e) =>
        setFormData({ ...formData, ogname: e.target.value })
        }
        disabled={formData.group !== 'yes'} // Disable if not hosting as a group
        />
        </div>

        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        Organization website
        <TextInput
            type='text'
            placeholder='Website of the organization'
            required={formData.group === 'yes'} // Required only if hosting as a group
            icon={CgWebsite}
            id='website'
            className='flex-1 ml-8'
            onChange={(e) =>
        setFormData({ ...formData, website: e.target.value })
        }
        disabled={formData.group !== 'yes'} // Disable if not hosting as a group
        />
        </div>
    </div>

<div className='mt-5'>FoodDrive Details</div>
<div className='flex flex-col gap-4 sm:flex-row justify-between'>
  Type of food drive
  <Select
    className='w-full ml-3'
    onChange={(e) =>
      setFormData({ ...formData, type: e.target.value })
    }
  >
    <option value='notype'>Select Your food drive type</option>
    <option value='onedaydrive'>One day FoodDrive</option>
    <option value='longdrive'>Long day FoodDrive</option>
  </Select>
</div>

<div className='flex flex-col gap-4 sm:flex-row justify-between'>
  {/* First Column: One day FoodDrive */}
    <div className={`flex flex-col gap-3 mr-4 ${formData.type === 'longdrive' ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className='flex flex-col gap-7 sm:flex-row justify-between '>
                 <div>Event Date</div>
            <TextInput
                type='date'
                required={formData.type === 'onedaydrive'}
                id='eventdate'
                className='flex-1 ml-10'
                onChange={(e) =>
                setFormData({ ...formData, eventdate: e.target.value })
                }
            disabled={formData.type === 'longdrive'}
            />
            </div>
        <div className='flex flex-col gap-7 sm:flex-row justify-between'>
            <div>Collecting<br></br>Time(From)</div>
        <TextInput
            type='text'
            placeholder='starting time'
            required={formData.type === 'onedaydrive'}
            icon={IoIosTime}
            id='eventtimefrom'
            className='flex-1 ml-9'
            onChange={(e) =>
            setFormData({ ...formData, eventtimefrom: e.target.value })
            }
        disabled={formData.type === 'longdrive'}
         />
        </div>

        <div className='flex flex-col gap-7 sm:flex-row justify-between'>
        <div>Collecting<br></br>Time(To)</div>
        <TextInput
            type='text'
            placeholder='ending time'
            required={formData.type === 'onedaydrive'}
            icon={IoIosTime}
            id='eventtimeto'
            className='flex-1 ml-12'
            onChange={(e) =>
            setFormData({ ...formData, eventtimeto: e.target.value })
            }
        disabled={formData.type === 'longdrive'}
        />
        </div>

        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <div>Collection Point(s)</div>
        <TextInput
            type='text'
            placeholder='Location(s) of collection point(s)'
            required={formData.type === 'onedaydrive'}
            icon={FaLocationDot}
            id='eventlocation'
            className='flex-1'
            onChange={(e) =>
            setFormData({ ...formData, eventlocation: e.target.value })
            }
        disabled={formData.type === 'longdrive'}
        />
        </div>
    </div>

  {/* Second Column: Long FoodDrive */}
    <div className={`flex flex-col gap-3 ml-2 ${formData.type === 'onedaydrive' ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className='flex flex-col gap-3 sm:flex-row justify-between'>
            <div>Proposed Date (From)</div>
                <TextInput
                type='date'
                required={formData.type === 'longdrive'}
                icon={BsCalendar2DateFill}
                id='DateFrom'
                className='flex-1 ml-7'
                onChange={(e) =>
            setFormData({ ...formData, DateFrom: e.target.value })
            }
            disabled={formData.type === 'onedaydrive'}
            />
            </div>
        <div className='flex flex-col gap-3 sm:flex-row justify-between'>
            <div>Proposed Date (To)</div>
            <TextInput
                type='date'
                required={formData.type === 'longdrive'}
                icon={BsCalendar2DateFill}
                id='DateTo'
                className='flex-1 ml-12'
                onChange={(e) =>
            setFormData({ ...formData, DateTo: e.target.value })
            }
        disabled={formData.type === 'onedaydrive'}
        />
        </div>
        <div className='flex flex-col gap-3 sm:flex-row justify-between'>
        <div>Collecting<br></br>Time(From)</div>
            <TextInput
                type='text'
                placeholder='starting time'
                required={formData.type === 'longdrive'}
                icon={IoIosTime}
                id='eventtimelongfrom'
                className='flex-1 ml-12'
                onChange={(e) =>
            setFormData({ ...formData, eventtimelongfrom: e.target.value })
            }
        disabled={formData.type === 'onedaydrive'}
        />
        </div>

        <div className='flex flex-col gap-6 sm:flex-row justify-between'>
        <div>Collecting<br></br>Time(To)</div>
            <TextInput
                type='text'
                placeholder='ending time'
                required={formData.type === 'longdrive'}
                icon={IoIosTime}
                id='eventtimelongto'
                className='flex-1 ml-12'
                onChange={(e) =>
            setFormData({ ...formData, eventtimelongto: e.target.value })
            }
        disabled={formData.type === 'onedaydrive'}
        />
        </div>

        <div className='flex flex-col gap-3 sm:flex-row justify-between'>
            <div>Collection Point(s)</div>
            <TextInput
                type='text'
                placeholder='Location(s) of collection point(s)'
                required={formData.type === 'longdrive'}
                icon={FaLocationDot}
                id='eventlocationlong'
                className='flex-1'
                onChange={(e) =>
            setFormData({ ...formData, eventlocationlong: e.target.value })
            }
        disabled={formData.type === 'onedaydrive'}
        />
        </div>
    </div>
</div>




      <div className='flex flex-col sm:flex-row justify-between mt-5 gap-12'>
              <div className='w-20'>No. of Volunteers needed</div>
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
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      Event Description
              <Textarea
                  type='text'
                  placeholder=' (e.g., supporting a specific cause or charity)
                  Goals for the food drive (e.g., amount of food to be collected, number of families to be supported)'
                  id='eventdescription'
                  rows='5'
                  onChange={(e) =>
                    setFormData({ ...formData, eventdescription: e.target.value })
                  }
                >
              </Textarea>
        </div>
        
        <div className='mt-5'>Logistic Details</div>
        <div className='flex flex-col gap-7 sm:flex-row justify-between'>
           Planning foodbank to handover
           <Select className='w-full ml-12'
                            onChange={(e) =>
                              setFormData({ ...formData, foodbank: e.target.value })
                            }
           >
                 <option value='nobank'>Select Your nearest foodbank</option>
                 <option value='gampaha'>Gampaha</option>
                 <option value='malabe'>Malabe</option>
            </Select>
          </div>

          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          Any special equipment or resources needed
              <Textarea
                  type='text'
                  placeholder=' (e.g., collection bins, signage) '
                  id='requirements'
                  rows='5'
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                >
              </Textarea>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
  FoodDrive Plan
  <div className='flex gap-4 items-center justify-between border-2 w-full ml-9'>
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
        'Upload FoodDrive Plan'
      )}
    </Button>
  </div>
  {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
</div>

<div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
  Safety Protocols
  <div className='flex gap-4 items-center justify-between border-2 w-full ml-7'>
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
        'Upload Safety protocol document'
      )}
    </Button>
  </div>
  {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
</div>

<div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
  Previous experiences
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
        'Upload valid document for past experiences'
      )}
    </Button>
  </div>
  {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
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
          Grateful for Your Giving: Thank You for Hosting a FoodDrive Event!.</h1>
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