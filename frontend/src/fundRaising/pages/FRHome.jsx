import React, { useEffect, useState } from "react";
import FRHero from "../components/FRHero";
import { Card, Progress, Spinner } from "flowbite-react";

export default function FRHome() {
  const [loading, setLoading] = useState(true);
  const [gotFrpDonations, setGotFrpDonations] = useState(null);
  const [frps, setFrps] = useState(null);
  const [topFrps, setTopFrps] = useState(null);
  console.log(gotFrpDonations);
  console.log(frps);
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
          setTopFrps(data);
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


              {/* {topFrps.sortedFundRaisingPages ? (
                <p>You have no posts yet!</p>
              ) : (
                <p>You have no posts yet!</p>
              )} */}
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-8">
                  <div className="shrink-0">
                    <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full">
                      <img
                        src="data:image/jpeg;base64,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"
                        alt="PagePhoto"
                        className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <p className="truncate text-lg font-medium text-gray-900 dark:text-white">
                      Neil Sims
                    </p>
                    <div className="w-full mx-auto flex flex-col gap-4">
                      <div className="right-2 top-0 flex gap-1 items-center">
                        <span className="text-base font-semibold text-gray-900">
                          Rs.1000
                        </span>
                        /
                        <span className="text-base font-semibold text-gray-900">
                          RS.20000
                        </span>
                      </div>
                      <div className="border-2 rounded-full border-gray-400">
                        <Progress
                          progress={56}
                          size="lg"
                          color="lime"
                          className="bg-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>



              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full">
                      <img
                        src="data:image/jpeg;base64,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"
                        alt="PagePhoto"
                        className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Bonnie Green
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $3467
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
