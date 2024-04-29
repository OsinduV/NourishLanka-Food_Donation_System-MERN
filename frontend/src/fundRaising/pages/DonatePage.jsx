import React from "react";
import {
  Button,
  Label,
  Radio,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

export default function DonatePage() {
  return (
    <div className="p-3 m-2 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl my-14 font-semibold">Help End Hunger Today</h1>
      <div className="flex flex-col gap-7">
        <div>
          <h2 className="text-xl">Your Donation</h2>
          <hr />
          <div className="p-3 max-w-2xl mx-auto flex flex-col gap-5">
            <div className="flex gap-4 items-center">
              <Label value="Donation Amount" />
              <TextInput
                type="text"
                placeholder="First Name"
                id="firstname"
                className="flex-1"
              />
            </div>
            <div className="flex gap-4 ">
              <Label value="Note" className="mt-2" />
              <Textarea placeholder="Leave a comment..." rows={5} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl">Payment Method</h2>
          <hr />
          <div className="p-3 max-w-2xl mx-auto flex gap-28 justify-center">
            <div className="flex items-center gap-2">
              <Radio
                id="cardPayment"
                name="paymentmethods"
                value="cardPayment"
                defaultChecked
              />
              <Label htmlFor="cardPayment">Pay with Card</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="cardPayment"
                name="paymentmethods"
                value="cardPayment"
                defaultChecked
              />
              <Label htmlFor="cardPayment">Fund Transfer/ Cash Deposit</Label>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl">Contact Details</h2>
          <hr />
          <div className="p-3 max-w-2xl mx-auto flex flex-col gap-5">
            <div className="flex gap-4 items-center">
              <Label value="Name" />
              <TextInput
                type="text"
                placeholder="First Name"
                id="firstname"
                className="flex-1"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Label htmlFor="DonationPrivacy" value="Donation Privacy" />
              <Select id="DonationPrivacy" className="flex-1" required>
                <option>Show my name publicly</option>
                <option>Show my name fundraiser only</option>
                <option>Hide my name from everyone</option>
              </Select>
            </div>
            <div className="flex gap-4 items-center">
              <Label value="Show my name as (Optional)" />
              <TextInput
                type="text"
                placeholder="First Name"
                id="firstname"
                className="flex-1"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Label value="Email Address" />
              <TextInput
                type="email"
                placeholder="First Name"
                id="firstname"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
