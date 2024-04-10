import React, { createContext, useState } from "react";
import { Button, Modal } from "flowbite-react";
import ContentUpdate from "../components/frpCreateComponents/ContentUpdate";
import ImgUpload from "../components/frpCreateComponents/ImgUpload";


export const FormDataContext = createContext(null);

export default function FRPCreate() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});

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
            <ContentUpdate/>
          </FormDataContext.Provider>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
