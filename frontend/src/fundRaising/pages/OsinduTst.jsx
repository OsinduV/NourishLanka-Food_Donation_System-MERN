import React, { useState } from "react";
import Stepper from "../components/Stepper";
import Account from "../components/steps/Account";
import Person from "../components/steps/Person";
import Completd from "../components/steps/Completd";

export default function OsinduTst() {

    const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Acc Info", "Personal Info", "complete"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;

      case 2:
        return <Person />;

      case 2:
        return <Completd />;

      default:
        break;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }

  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white border-2">
      {/* stepper */}
      <div className="container horizontal mt-5">
        <Stepper />
      </div>
      {/* Navigation controls */}
      <div className="p-3 flex gap-5">
        <button onClick={() => handleClick()} className={`${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>back</button>
        <button onClick={() => handleClick("next")} >{currentStep === steps.length ? "Confirm" : "Next"}</button>
      </div>
    </div>
  );
}
