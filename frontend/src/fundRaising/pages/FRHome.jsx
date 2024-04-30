import React, { useEffect, useState } from "react";
import FRHero from "../components/FRHero";
import { Card, Progress, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

export default function FRHome() {
  const [loading, setLoading] = useState(true);
  const [gotFrpDonations, setGotFrpDonations] = useState(null);
  const [frps, setFrps] = useState(null);
  const [topFrps, setTopFrps] = useState(null);
  // console.log(gotFrpDonations);
  // console.log(frps);
  console.log(topFrps);

  useEffect(() => {
    const fetchFrp = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/frp/getfrps`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setFrps(data);
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
        const res = await fetch("/api/frpdonation/getfrpdonations");
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

    const fetchTopFrps = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/frpdonation/gettopfrps");
        const data = await res.json();
        if (res.ok) {
          setTopFrps(data.totalAmountwithtopfrp);
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

    fetchFrpDonations();
    fetchFrp();
    fetchTopFrps();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="w-full min-h-screen">
      <FRHero
        raised={gotFrpDonations && gotFrpDonations.totalFrpDonationsAmount}
        participants={gotFrpDonations && gotFrpDonations.uniqueUsersCount}
        frps={frps && frps.totalFrps}
      />
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="text-3xl  p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          WHAT IS A VIRTUAL FOOD DRIVE?
        </h1>
        <div className="py-6 mx-auto max-w-3xl w-full flex flex-col gap-6">
          <p>
            A Virtual Food Drive is a modern approach to supporting those in
            need by raising funds online to provide meals to individuals and
            families facing food insecurity. Unlike traditional food drives
            where physical food items like canned goods are collected, a virtual
            food drive focuses on monetary donations.
          </p>
          <p>
            Through a virtual food drive, you and your community can make a
            significant impact by contributing funds. These donations enable
            nourishLanka to stretch each donated rupee further, ultimately
            providing more meals than if you were to purchase food items from a
            store and donate them directly.
          </p>
          <p>
            In essence, a virtual food drive harnesses the power of online
            fundraising to amplify the impact of your generosity, ensuring that
            more individuals receive the nourishment they need to thrive. It's a
            convenient and effective way to make a difference in the lives of
            your neighbors in need.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto my-10">
        <Card className="max-w-3xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
              Top 5 Fundraisers
            </h5>
          </div>

          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {topFrps ? (
                <>
                  {topFrps.map((frp) => (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-8">
                        <div className="shrink-0">
                          <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full">
                            <Link to={`/fr-page/${frp._id}`}>
                              <img
                                src={frp.frpIdData.pageImage}
                                alt="PagePhoto"
                                className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <p className="truncate text-lg font-medium text-gray-900 font-semibold dark:text-white">
                            <Link to={`/fr-page/${frp._id}`}>
                              {frp.frpIdData.displayName}
                            </Link>
                          </p>
                          <div className="w-full mx-auto flex flex-col gap-4">
                            <div className="right-2 top-0 flex gap-1 items-center">
                              <span className="text-base font-semibold">
                                Rs. {frp.totalAmount}
                              </span>
                              /
                              <span className="text-base font-semibold">
                                Rs. {frp.frpIdData.goal}
                              </span>
                            </div>
                            <div className="border-2 rounded-full border-gray-400">
                              <Progress
                                progress={
                                  (frp.totalAmount / frp.frpIdData.goal) * 100
                                }
                                size="lg"
                                color="teal"
                                className="bg-gray-200"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <p>You have no posts yet!</p>
              )}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
