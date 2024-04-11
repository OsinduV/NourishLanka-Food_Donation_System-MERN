import React, { useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice.js";

export default function FRReg() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ isFundraiser: true });
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [frpCreateError, setFrpCreateError] = useState(null);

  const initialFrpData = { goal: "0", content: "sample content from frontend" };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        return;
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
        try {
          const resfrp = await fetch("/api/frp/createfrp", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify(initialFrpData),
          });
          const result = await resfrp.json();
          if(!resfrp.ok){
            setFrpCreateError(result.message);
            return;
          }else{
            setFrpCreateError(null);
          }
        } catch (error) {
          setFrpCreateError(error.message);
          return;
        }
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      return;
    }
  };
  console.log(formData);

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl my-14 font-semibold">Register as a Fundraiser</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div>
          <Label value="Your Name" />
          <TextInput
            type="text"
            id="usernamer"
            placeholder="User Name"
            defaultValue={currentUser.username}
            className="flex-1"
            readOnly
          />
        </div>
        <div>
          <Label value="Email Address" />
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            readOnly
          />
        </div>
        <div>
          <Label value="Address Information" />
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="flex items-center gap-2">
              <Label value="District" />
              <TextInput
                type="text"
                id="district"
                placeholder="e.g. Colombo"
                className="flex-1"
                required
                defaultValue={currentUser.district}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label value="City" />
              <TextInput
                type="text"
                id="city"
                placeholder="e.g. Nawala"
                className="flex-1"
                required
                defaultValue={currentUser.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label value="Address" />
            <TextInput
              type="text"
              id="address"
              placeholder="e.g. 105/2, koswatta rd, ..."
              className="flex-1"
              required
              defaultValue={currentUser.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          size="lg"
          outline
          className="my-4"
        >
          Register
        </Button>
      </form>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {frpCreateError && (
        <Alert color="failure" className="mt-5">
          {frpCreateError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
    </div>
  );
}
