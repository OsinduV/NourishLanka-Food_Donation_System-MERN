import { Button, Progress } from "flowbite-react";
import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FRPage() {
  return (
    <div className="w-full">
      <div className="max-w-full mx-auto py-4">{/*formdiv*/}
        <div className="max-h-[500px] relative">
          {/* Overlay */}
          <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/70 flex flex-col justify-center gap-6">
            <div className="relative w-36 h-36 self-center cursor-pointer shadow-md rounded-full">
              <img
                src="https://images.pexels.com/photos/4968631/pexels-photo-4968631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="PagePhoto"
                className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
              />
            </div>

            <h1 className="text-4xl font-bold mx-auto ">Osindu Vimukthi</h1>
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
                <span className="text-md lg:text-lg font-semibold">Rs.5000000 RAISED</span>
                <span className="text-md lg:text-lg font-semibold">Goal RS.10000000</span>
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
            src="https://images.pexels.com/photos/4968631/pexels-photo-4968631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="/"
          />
        </div>
      </div>
    </div>
  );
}
