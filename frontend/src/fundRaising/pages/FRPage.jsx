import { Alert, Button, Modal, Progress, Spinner } from "flowbite-react";
import React, { createContext, useEffect, useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentUpdate from "../components/frpComponents/ContentUpdate";
import Thankyou from "../components/frpComponents/Thankyou";
import ImgUpload from "../components/frpComponents/ImgUpload";
import GoalUpdate from "../components/frpComponents/GoalUpdate";
import DisplayNameUpdate from "../components/frpComponents/DisplayNameUpdate";
import BannerImgUpload from "../components/frpComponents/BannerImgUpload";

export const FormDataContext = createContext(null);

export default function FRPage() {
  const { frpId, updatestat } = useParams();
  const [loading, setLoading] = useState(true);
  const [frp, setFrp] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [count, setCount] = useState(0);

  const [updateError, setUpdateError] = useState(null);

  // if(initialstate){
  //   setOpenModal(true)
  // }
  console.log(formData);
  //  console.log(currentUser._id)
  console.log(frp);

  const countup = (i) => {
    setCount(0);
    const increment = () => {};
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Thankyou />;

      case 2:
        return (
          <div className="flex flex-col gap-7">
            <DisplayNameUpdate />
            <GoalUpdate />
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-4">
            <ImgUpload />
            <hr className="my-3 border-1" />
            <BannerImgUpload />
          </div>
        );

      case 4:
        return <ContentUpdate />;

      default:
        break;
    }
  };
  useEffect(() => {
    if (updatestat == true) {
      setOpenModal(true);
    }
  }, [updatestat]);

  useEffect(() => {
    const fetchFrp = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/frp/getfrps?frpId=${frpId}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setFrp(data.frps[0]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        return;
      }
    };
    fetchFrp();
  }, [frpId, updatestat]);

  const handleUpdateFrp = async (e) => {
    // e.preventDefault();
    try {
      const res = await fetch(`/api/frp/updatefrp/${frp._id}/${frp.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setUpdateError(data.message);
        console.log(data.message);
        return;
      }

      if (res.ok) {
        setUpdateError(null);
        navigate(`/fr-page/${data._id}`);
        // let newStep = currentStep;
        // setCurrentStep(++newStep);
         setOpenModal(false);
      }
    } catch (error) {
      setUpdateError(error.message);
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-full mx-auto py-4">
        {/*formdiv*/}
        <div className="max-h-[500px] relative">
          {/* Overlay */}
          <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/60 flex flex-col justify-center gap-6">
            <div className="relative w-36 h-36 self-center cursor-pointer shadow-md rounded-full">
              <img
                src={frp.pageImage}
                alt="PagePhoto"
                className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
              />
            </div>

            <h1 className="text-4xl font-bold mx-auto ">
              {frp && frp.displayName}
            </h1>
            <div className="mx-auto">
              <Link to="/sign-in">
                <Button size="lg" gradientDuoTone="pinkToOrange">
                  Donate
                  <FaHandHoldingHeart className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="w-3/4 lg:w-3/5 mx-auto">
              <div className="flex justify-between">
                <span className="text-md lg:text-lg font-semibold">
                  Rs.5000000 RAISED
                </span>
                <span className="text-md lg:text-lg font-semibold">
                  Goal: RS.{frp && frp.goal}
                </span>
              </div>
              <div className="border-2 rounded-full">
                <Progress
                  progress={65}
                  size="xl"
                  color="pink"
                  className="bg-gray-700"
                />
              </div>
            </div>
          </div>
          <img
            className="w-full max-h-[500px] object-cover"
            src={frp.bannerImage}
            alt="/"
          />
        </div>
      </div>
      <div className="px-4 py-10 flex flex-col max-w-6xl mx-auto">
        <div
          className="mx-auto w-full post-content"
          dangerouslySetInnerHTML={{
            __html: frp && frp.content,
          }}
        ></div>
      </div>
      <Modal show={openModal} size="2xl" onClose={() => setOpenModal(false)}>
        {currentStep > 1 && <Modal.Header />}
        <Modal.Body>
          <FormDataContext.Provider
            value={{
              formData,
              setFormData,
              currentUser,
              currentStep,
              setCurrentStep,
              frp,
            }}
          >
            {/* <GoalUpdate/> */}
            {/* <ContentUpdate/> */}
            {/* <ImgUpload/> */}
            {/* <Thankyou /> */}
            {displayStep(currentStep)}
          </FormDataContext.Provider>
        </Modal.Body>

        {currentStep > 1 && currentStep < 5 && (
          <Modal.Footer>
            {updateError && (
              <Alert className="mt-5 flex flex-1" color="failure">
                {updateError}
              </Alert>
            )}
            <div className="flex w-full justify-between items-center px-7">
              <div
                className="text-cyan-700 hover:underline dark:text-cyan-500 cursor-pointer"
                onClick={() => {
                  let newStep = currentStep;
                  setCurrentStep(--newStep);
                }}
              >
                Back
              </div>
              <div>
                {currentStep === 4 ? (
                  <Button gradientMonochrome="pink" onClick={handleUpdateFrp}>
                    Finish
                  </Button>
                ) : (
                  <Button
                    gradientMonochrome="pink"
                    onClick={() => {
                      let newStep = currentStep;
                      setCurrentStep(++newStep);
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}
