import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

import { FormDataContext } from "./FRPage";
import DisplayNameUpdate from "../components/frpComponents/DisplayNameUpdate";
import GoalUpdate from "../components/frpComponents/GoalUpdate";
import ImgUpload from "../components/frpComponents/ImgUpload";
import BannerImgUpload from "../components/frpComponents/BannerImgUpload";
import ContentUpdate from "../components/frpComponents/ContentUpdate";

export default function FRPCreate() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  console.log(formData)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {   
      const res = await fetch("/api/frp/createfrp", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
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
        // navigate(`/fr-page/${data._id}`);
        navigate(`/dashboard?tab=myfrps`);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create New Fundraising Page
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <FormDataContext.Provider
          value={{
            formData,
            setFormData,
          }}
        >
          <div className="flex flex-col gap-7">
            <DisplayNameUpdate />
            <GoalUpdate />
            <ImgUpload />
            <BannerImgUpload />
            <ContentUpdate />
          </div>
        </FormDataContext.Provider>
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="mt-10 mb-5"
        >
          Create New
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
