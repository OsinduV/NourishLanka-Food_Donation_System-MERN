import { Alert, Button, FileInput, Modal, Select, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const { donationId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  console.log(formData);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchDonation = async () => {
        const res = await fetch(`/api/donation/getdonations?donationId=${donationId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.donations[0]);
        }
      };

      fetchDonation();
    } catch (error) {
      console.log(error.message);
    }
  }, [donationId]);

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
      const res = await fetch(`/api/donation/updatedstatus/${formData._id}/${currentUser._id}`, {
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
        navigate(`/donation/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Event Status Update</h1>
      <form className='flex flex-col gap-4 mb-20' onSubmit={handleSubmit}>
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
                value={formData.eventtitle}
               />


                <Select
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    value={formData.category}
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
                value={formData.dnid}
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
                value={formData.donoremail}
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
                 onChange={(e) =>
                  setFormData({ ...formData, eventdate: e.target.value })
                }
                value={formData.eventdate}
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
                value={formData.eventtime}
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
                value={formData.eventlocation}
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
                  value={formData.eventdescription}
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
                            value={formData.budget}
           >
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

          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
            {formData.image1 && (
            <div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
              <img
                src={formData.image1}
                alt='upload'
                className='w-full h-full object-cover'
              />
           </div>
           )}
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
                value={formData.attendees}
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
                value={formData.volunteers}
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
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
            {formData.image2 && (
          <div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
            <img
             src={formData.image2}
             alt='upload'
             className='w-full h-full object-cover'
            />
          </div>
          )}

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
          </div>
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
            {formData.image3 && (
    <div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
      <img
        src={formData.image3}
        alt='upload'
        className='w-full h-full object-cover'
      />
    </div>
  )}

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
                  value={formData.conserns}
                >
              </Textarea>

          </div>

          <div className='border border-teal-400 rounded p-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between font-semibold mt-10 mb-10 text-lg'>
             Update Status of the event
                <Select className='w-full ml-12'
                  onChange={(e) =>
                   setFormData({ ...formData, status: e.target.value })
                }
                value={formData.status}
                 >
                    <option value='processing'>Processing</option>
                    <option value='onprogress'>On progress</option>
                    <option value='approved'>Approved</option>
                   <option value='declined'>Declined</option>
                </Select>
              </div>
          </div>

          <Button type='submit' gradientDuoTone='greenToBlue' 
          onClick={() => {
            setShowModal(true);
          }} >
          Update Status
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