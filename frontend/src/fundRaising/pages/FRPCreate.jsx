import React, { createContext, useState } from "react";
import { Alert, Button, Modal } from "flowbite-react";
import ContentUpdate from "../components/frpCreateComponents/ContentUpdate";
import ImgUpload from "../components/frpCreateComponents/ImgUpload";
import GoalUpdate from "../components/frpCreateComponents/GoalUpdate";


export const FormDataContext = createContext(null);

export default function FRPCreate() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState(null);

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/frp/createfrp', {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        setSubmitError(data.message);
        return;
      }
      if(res.ok){
        setSubmitError(null);
      }
    } catch (error) {
      setSubmitError("Something went wrong");
    }

  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <Button onClick={() => setOpenModal(true)} className="mb-5">
        Toggle modal
      </Button>

      <Modal show={openModal} size="2xl" onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <FormDataContext.Provider
            value={{
              formData,
              setFormData,
            }}
          >
            {/* <GoalUpdate/> */}
            <ContentUpdate/>
            {/* <ImgUpload/> */}
          </FormDataContext.Provider>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
      {
        submitError && <Alert className="mt-5" color="failure">{submitError}</Alert>
      }
    </div>
  );
}
