import React, { useContext } from "react";
import { FormDataContext } from "../../pages/FRPage";
import { Button } from "flowbite-react"

export default function Thankyou() {
  const { currentUser,currentStep, setCurrentStep } = useContext(FormDataContext);
  const nextStep = () => {
    let newStep = currentStep;
    setCurrentStep(++newStep);
  }
  return (
    <div className="">
      <h1 className="text-xl font-medium">Thank you for registering {currentUser && currentUser.username} !</h1>
      <hr className="my-3 border-1 bg-gray-700"/>
      <p className="py-3 h-32">We're excited you'll be joining us for the NourishLanka Virtual Food Drives. We've created a personal fundraising page just for you  that you can use to share your story and spread the world about the event.</p>
      <hr className="my-3 border-1 bg-gray-700"/>
      <div className="flex justify-center">
      <Button onClick={nextStep} gradientMonochrome="pink">Customize Your Page</Button>
      </div>
    </div>
  );
}
