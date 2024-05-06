import React, { useState, useEffect, useRef } from "react";
import { Alert, Button } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function VolunteerSix() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const res = await fetch(`/api/volunteer/getvolunteer?userId=${userId}`);
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setFormData(data.volunteers[0] || {});
    };
    fetchVolunteers();
  }, [userId]);

  const generatePDF = () => {
    const input = reportRef.current;
    if (!input) {
      console.error("Report element not found");
      return;
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgwidth= 210;
      const imgHeight=(canvas.height*imgwidth)/canvas.width;
      pdf.addImage(imgData, "PNG", 10,10,400,300 );
      pdf.save("report.pdf");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/volunteer/getvolunteer?userId=${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate("/volunteer-one");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div
      className="flex justify-between max-w-4xl mx-auto mt-10"
      ref={reportRef}
    >
      <div className="bg-white text-black rounded-lg shadow-md p-8 max-w-md border-2">
        <h1 className="text-3xl font-bold text-center mb-6">
          Volunteering Details
        </h1>
        <form className="flex flex-col gap-4 mb-7" onSubmit={handleSubmit}>
          {/* Form content */}
        </form>
        <div className="p-4 border-t border-gray-300">
          <h1 className="text-lg font-bold mb-2">Volunteer Information</h1>
          <ul className="list-inside">
            <li className="mb-2">
              <strong>Full Name:</strong> {formData.fullName}
            </li>
            <li className="mb-2">
              <strong>Email:</strong> {formData.email}
            </li>
            <li className="mb-2">
              <strong>Address:</strong> {formData.address}
            </li>
            <li className="mb-2">
              <strong>Phone Number:</strong> {formData.phoneNumber}
            </li>

            <li className="mb-2">
              <strong>Date:</strong> {formData.date}
            </li>

            <li className="mb-2">
              <strong>Category:</strong> {formData.category}
            </li>
            <li className="mb-2">
              <strong>Time:</strong> {formData.time}
            </li>
            <li className="mb-2">
              <strong>Foodbank Name:</strong>{" "}
              {formData.foodbankId && formData.foodbankId.foodbankname}
            </li>
            <li className="mb-2">
              <strong>Foodbank district:</strong>{" "}
              {formData.foodbankId && formData.foodbankId.district}
            </li>
            <li className="mb-2">
              <strong>Foodbank address:</strong>{" "}
              {formData.foodbankId && formData.foodbankId.address}
            </li>
          </ul>
        </div>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </div>
      {/* Removed the div with absolute positioning */}
      <div className="flex-1 ml-4">
        <img
          src="https://img.freepik.com/free-photo/smiley-volunteers-preparing-food-provisions-donation_23-2148637978.jpg?t=st=1714180638~exp=1714184238~hmac=725fc4f845d749fb3126a98815415791d2f0deb3aee23ef4a64b28373fbf6b74&w=740"
          className="h-full w-full object-cover rounded-lg shadow-lg border-4 border-white"
          alt="Volunteering"
        />
      </div>
      {/* Moved the button here */}
      <div className="absolute top-20 right-0 m-4">
        <Button
          type="button"
          gradientDuoTone="greenToBlue"
          onClick={generatePDF}
        >
          Generate a PDF
        </Button>
      </div>
    </div>
  );
}
