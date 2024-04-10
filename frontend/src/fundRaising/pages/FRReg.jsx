import React from "react";
import { Button, Label, TextInput } from "flowbite-react";

export default function FRReg() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl my-14 font-semibold">Register as a Fundraiser</h1>
      <form className="flex flex-col gap-7">
        <div>
          <Label value="Your Name" />
          <div className="flex gap-4">
            <TextInput
              type="text"
              placeholder="First Name"
              id="firstname"
              className="flex-1"
            />
            <TextInput
              type="text"
              placeholder="Last Name"
              id="lastname"
              className="flex-1"
            />
          </div>
        </div>
        <div>
          <Label value="Email Address" />
          <TextInput type="email" placeholder="First Name" id="firstname" />
        </div>
        <div>
          <Label value="Address Information"/>
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="flex items-center gap-2">
              <Label value="Province" />
              <TextInput
                type="email"
                placeholder="First Name"
                id="firstname"
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label value="City" />
              <TextInput
                type="email"
                placeholder="First Name"
                id="firstname"
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label value="Address" />
            <TextInput
              type="email"
              placeholder="First Name"
              id="firstname"
              className="flex-1"
            />
          </div>
        </div>
        <Button type="submit" gradientDuoTone="purpleToPink" size="lg" outline className="my-4">
          Register
        </Button>
      </form>
    </div>
  );
}
