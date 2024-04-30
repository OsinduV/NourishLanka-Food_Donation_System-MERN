import { Button, Progress } from "flowbite-react";
import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaPager } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Badge from "./Badge";

export default function FRHero({
  raised,
  participants,
  frps
}) {
  return (

    <div className="max-w-full mx-auto py-4">
      <div className="max-h-[500px] relative">
        {/* Overlay */}
        <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/65 flex flex-col justify-center ">
          <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mx-auto bg-gradient-to-r from-green-500 to-white text-transparent bg-clip-text">
            Virtual Food Drives
          </h1>
          <div className="flex justify-center my-10 gap-4">
            <Link to="/fr-reg">
              <Button size="lg" gradientDuoTone="greenToBlue">
                Register
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button size="lg" gradientDuoTone="greenToBlue">
                Donate
                <FaHandHoldingHeart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="mx-auto flex flex-col gap-5 sm:flex-row">
            {/* badge */}
            <Badge
              icon={<FaUsers />}
              endCountNum={participants && participants}
              startCountText=""
              badgeText="Doners"
              containerStyles="w-64 "
            />
            <Badge
              icon={<FaHandHoldingHeart />}
              endCountNum={raised && raised}
              startCountText="Rs."
              badgeText="RAISED"
              containerStyles="min-w-64 pr-4"
            />
            <Badge
              icon={<FaPager />}
              endCountNum={frps && frps}
              startCountText=""
              badgeText="Fundraising Pages"
              containerStyles="w-64"
            />
          </div>
        </div>
        <img
          className="w-full max-h-[500px] object-cover"
          src="https://img.freepik.com/free-photo/group-asian-diverse-people-volunteer-holding-donation-box-fundraiser-emergency-situation-such-as-help-ukraine-flood-victims-food-children-charity-eventvolunteering-conceptual_640221-322.jpg?w=996&t=st=1714398484~exp=1714399084~hmac=00e7894f5c2c1103f7fda90b2f8e66ea549693c77246900f119ed7d04502c51b"
          alt="/"
        />
      </div>
    </div>
  );
}
