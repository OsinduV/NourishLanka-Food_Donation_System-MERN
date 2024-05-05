import {
  Alert,
  Button,
  Modal,
  Navbar,
  Progress,
  Spinner,
} from "flowbite-react";
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
import { MdModeEditOutline } from "react-icons/md";
import CommentSection from "../../Ratings and Review_f/components/CommentSection";
import FrpDonations from "../components/FrpDonations";

export const FormDataContext = createContext(null);

export default function FRPage() {
  const { frpId, updatestat } = useParams();
  const [loading, setLoading] = useState(true);
  const [frp, setFrp] = useState(null);
  const [gotFrps, setGotFrps] = useState(null);
  console.log(gotFrps);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [count, setCount] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [nameModel, setNameModel] = useState(false);
  const [imgModel, setImgModel] = useState(false);
  const [bannerModel, setBannerModel] = useState(false);
  const [contentModel, setContentModel] = useState(false);
  const [goalModel, setGoalModel] = useState(false);

  const [showDonations, setShowDonations] = useState(false);

  const [callUseEffect, setCallUseEffect] = useState(false);

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

    const fetchFrpDonations = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/frpdonation/getfrpdonations?frpId=${frpId}`
        );
        const data = await res.json();
        if (res.ok) {
          setGotFrps(data);
          setLoading(false);
        }
        if (!res.ok) {
          setLoading(false);
          console.log(data.message);
          return;
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        return;
      }
    };

    fetchFrp();
    fetchFrpDonations();
  }, [frpId, updatestat, callUseEffect]);

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
        // navigate(`/fr-page/${data._id}`);
        setCallUseEffect(!callUseEffect);
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
            {(currentUser._id == frp.userId || currentUser.isAdmin) && (
              <div className="absolute top-4 left-5">
                <Button onClick={() => setEditMode(!editMode)}>
                  {editMode ? "View" : "Edit"}
                </Button>
              </div>
            )}
            {editMode && (
              <div
                onClick={() => setBannerModel(true)}
                className="absolute right-0 top-0 bg-gray-200 text-gray-800 text-lg rounded-md p-1 cursor-pointer m-6 hover:text-pink-500"
              >
                <MdModeEditOutline />
              </div>
            )}
            <div className="relative mx-auto px-16">
              <div className="w-40 h-40 self-center cursor-pointer shadow-md rounded-full">
                <img
                  src={frp.pageImage}
                  alt="PagePhoto"
                  className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
                />
              </div>
              {editMode && (
                <div
                  onClick={() => setImgModel(true)}
                  className="absolute right-0 top-0 bg-gray-200 text-gray-800 text-lg rounded-md p-1 cursor-pointer hover:text-pink-500"
                >
                  <MdModeEditOutline />
                </div>
              )}
            </div>
            <div className="mx-auto flex gap-3 relative px-16">
              <h1 className="text-4xl font-bold mx-auto ">
                {frp && frp.displayName}
              </h1>
              {editMode && (
                <div
                  onClick={() => setNameModel(true)}
                  className="absolute right-0 bg-gray-200 text-gray-800 text-lg rounded-md p-1 cursor-pointer hover:text-pink-500"
                >
                  <MdModeEditOutline />
                </div>
              )}
            </div>

            <div className="mx-auto">
              <Link to={`/frpdonate-page/${frp._id}`}>
                <Button size="lg" gradientDuoTone="greenToBlue">
                  Donate
                  <FaHandHoldingHeart className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="w-3/4 lg:w-3/5 mx-auto relative px-14">
              {editMode && (
                <div
                  onClick={() => setGoalModel(true)}
                  className="absolute right-0 top-0 bg-gray-200 text-gray-800 text-lg rounded-md p-1 cursor-pointer hover:text-pink-500"
                >
                  <MdModeEditOutline />
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-md lg:text-lg font-semibold">
                  Rs.{gotFrps && gotFrps.totalFrpDonationsAmount} RAISED
                </span>
                <span className="text-md lg:text-lg font-semibold">
                  Goal: RS.{frp && frp.goal}
                </span>
              </div>
              <div className="border-2 rounded-full">
                <Progress
                  progress={
                    gotFrps &&
                    frp &&
                    (gotFrps.totalFrpDonationsAmount / frp.goal) * 100
                  }
                  size="xl"
                  color="teal"
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

      <Navbar className="border-b-2">
        <div className="mx-auto flex gap-3">
          <div
            className={`hover:bg-gray-300 p-2 rounded-md cursor-pointer ${
              !showDonations ? "bg-gray-300" : ""
            }`}
            onClick={() => setShowDonations(false)}
          >
            <p className="text-lg">Story</p>
          </div>
          <div
            className={`hover:bg-gray-300 p-2 rounded-md cursor-pointer ${
              showDonations ? 'bg-gray-300' : ''
            }`}
            onClick={() => setShowDonations(true)}
          >
            <p className="text-lg">Donations</p>
          </div>
        </div>
      </Navbar>
      {showDonations ? (
        <div className="px-14 py-10 max-w-6xl mx-auto">
          <FrpDonations frp_Id={frp._id} />
        </div>
      ) : (
        <div className="px-14 py-10 flex flex-col max-w-6xl mx-auto relative">
          {editMode && (
            <div
              onClick={() => setContentModel(true)}
              className="absolute right-0 top-2 bg-gray-600 text-white dark:bg-gray-200 dark:text-gray-800 text-xl rounded-md p-2 cursor-pointer hover:text-pink-500"
            >
              <MdModeEditOutline />
            </div>
          )}
          <div
            className="mx-auto w-full post-content"
            dangerouslySetInnerHTML={{
              __html: frp && frp.content,
            }}
          ></div>
        </div>
      )}

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

      <Modal show={nameModel} size="2xl" onClose={() => setNameModel(false)}>
        <Modal.Header />

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
            <DisplayNameUpdate />
          </FormDataContext.Provider>
        </Modal.Body>

        <Modal.Footer>
          <Button
            gradientMonochrome="teal"
            onClick={() => {
              handleUpdateFrp();
              setNameModel(false);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={imgModel} size="2xl" onClose={() => setImgModel(false)}>
        <Modal.Header />

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
            <ImgUpload />
          </FormDataContext.Provider>
        </Modal.Body>

        <Modal.Footer>
          <Button
            gradientMonochrome="teal"
            onClick={() => {
              handleUpdateFrp();
              setImgModel(false);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={bannerModel}
        size="2xl"
        onClose={() => setBannerModel(false)}
      >
        <Modal.Header />

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
            <BannerImgUpload />
          </FormDataContext.Provider>
        </Modal.Body>

        <Modal.Footer>
          <Button
            gradientMonochrome="teal"
            onClick={() => {
              handleUpdateFrp();
              setBannerModel(false);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={goalModel} size="2xl" onClose={() => setGoalModel(false)}>
        <Modal.Header />

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
            <GoalUpdate />
          </FormDataContext.Provider>
        </Modal.Body>

        <Modal.Footer>
          <Button
            gradientMonochrome="teal"
            onClick={() => {
              handleUpdateFrp();
              setGoalModel(false);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={contentModel}
        size="2xl"
        onClose={() => setContentModel(false)}
      >
        <Modal.Header />

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
            <ContentUpdate />
          </FormDataContext.Provider>
        </Modal.Body>

        <Modal.Footer>
          <Button
            gradientMonochrome="teal"
            onClick={() => {
              handleUpdateFrp();
              setContentModel(false);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <CommentSection postId={frp._id} />
    </div>
  );
}
