import React from 'react'
import { Button, FileInput, Select, TextInput, } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreateFoodRequest() {
  return (
    
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Are you facing food scarcity, finding it challenging to access enough nourishing meals?</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
        Submitting a food request through our form allows us to gather essential information about your specific food needs. By completing the form, you provide us with valuable details that enable us to better understand how we can assist you in accessing the food support you require. 
        Your submission helps us tailor our assistance to best serve your needs.
        </p>
       <div className='container mx-auto'>
  <h1 className='text-center text-3xl my-7 font-semibold'>Send a Food Request</h1>
  <form className='flex flex-col gap-4' >
    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <TextInput
        type='text'
        placeholder='Name of the Requester'
        required
        id='name'
        className='flex-1'
      />
      <Select
        required
        id='district'
        className='flex-1'
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
      />
      <TextInput
        type='number'
        placeholder='Number of males'
        required
        id='males'
        className='flex-1'
        min="0"
      />
      <TextInput
        type='number'
        placeholder='Number of females'
        required
        id='females'
        className='flex-1'
        min="0"
      />
    </div>
    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <TextInput
        type='email'
        placeholder='Gmail'
        required
        id='gmail'
        className='flex-1 '
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        title="Enter a valid email address"
      />
      <TextInput
        type='text'
        placeholder='Address'
        required
        id='address'
        className='flex-1'
      />
    </div>
    <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' />
          <Button
            type='button'
            gradientDuoTone='greenToBlue'
            size='sm'
            outline
          >
            Upload Grama Niladhari Certificate for low-income familes
          </Button>
        </div>
    <ReactQuill
          theme='snow'
          placeholder='Add special needs here...'
          className='h-72 mb-12'
          required
        />
    <Button
      type='submit'
      gradientDuoTone='greenToBlue'
    >
      Submit the Food Request
    </Button>
  </form>
</div>






     
      </div>

  );
  
}
