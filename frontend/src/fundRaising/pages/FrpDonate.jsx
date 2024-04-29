import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  Progress,
  Radio,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function FrpDonate() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({privacy: 'public'});

  const { frpId } = useParams();
  const [loading, setLoading] = useState(true);
  const [frp, setFrp] = useState(null);
  const [gotFrpDonations, setGotFrpDonations] = useState(null);

  const [createError, setCreateError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/frpdonation/createfrpdonation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateError(data.message);
        return;
      }

      if (res.ok) {
        setCreateError(null);
        navigate(`/fr-page/${frpId}`);
      }
    } catch (error) {
      setCreateError('Something went wrong');
    }
  };

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
          setFormData({ ...formData, frpId: frpId })
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
        const res = await fetch(`/api/frpdonation/getfrpdonations?frpId=${frpId}`);
        const data = await res.json();
        if (res.ok) {
          setGotFrpDonations(data);
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
  }, [frpId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="p-3 m-2 max-w-3xl mx-auto min-h-screen">
      <div className="flex gap-8">
        <div className="w-36 h-36 self-center cursor-pointer shadow-md rounded-full">
          <img
            src={frp.pageImage}
            alt="PagePhoto"
            className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-semibold">
            Supporting "{frp.displayName}"
          </h1>
          <div className="w-full mx-auto relative">
            <div className="absolute right-2 top-0 flex gap-1 items-center">
              <span className="text-sm font-semibold">Rs.{gotFrpDonations && gotFrpDonations.totalFrpDonationsAmount}</span>/
              <span className="text-sm font-semibold">
                RS.{frp && frp.goal}
              </span>
            </div>
            <div className="border-2 rounded-full border-gray-400">
              <Progress
                progress={(gotFrpDonations && frp) && gotFrpDonations.totalFrpDonationsAmount/frp.goal*100}
                size="lg"
                color="green"
                className="bg-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl my-14 font-semibold">Help End Hunger Today</h1>

      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl">Your Donation</h2>
          <hr />
          <div className="p-3 max-w-2xl mx-auto flex flex-col gap-5">
            <div className="flex gap-4 items-center">
              <Label value="Donation Amount" />
              <TextInput
                type="number"
                placeholder="amount"
                id="amount"
                className="flex-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 ">
              <Label value="Note" className="mt-2" />
              <Textarea
                placeholder="Leave a comment for fundraiser ..."
                id="note"
                rows={5}
                onChange={handleChange}
              />
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
                placeholder="Name"
                id="name"
                className="flex-1"
                defaultValue={currentUser.username}
                readOnly
                color="success"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Label htmlFor="DonationPrivacy" value="Donation Privacy" />
              <Select
                id="privacy"
                className="flex-1"
                required
                onChange={handleChange}
              >
                <option value="public">Show my name publicly</option>
                <option value="onlyfr">Show my name fundraiser only</option>
                <option value="private">Hide my name from everyone</option>
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
                defaultValue={currentUser.email}
                readOnly
                color="success"
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          size="lg"
          className="my-10"
        >
          Donate
        </Button>
      </form>
    </div>
  );
}
