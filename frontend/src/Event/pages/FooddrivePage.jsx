import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function FooddrivePage() {
    const { fooddriveSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fooddrive, setFooddrive] = useState(null);


    useEffect(() => {
        const fetchFooddrive = async () => {
            try {
              setLoading(true);
              const res = await fetch(`/api/fooddrive/getfooddrives?slug=${fooddriveSlug}`);
              const data = await res.json();
              if (!res.ok) {
                setError(true);
                setLoading(false);
                return;
              }
              if (res.ok) {
                setFooddrive(data.fooddrives[0]);
                setLoading(false);
                setError(false);
              }
            } catch (error) {
              setError(true);
              setLoading(false);
            }
          };
          fetchFooddrive();
    },[fooddriveSlug]);

    if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

    function TableRow({ label, value }) {
      return (
        <tr className="hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
          <td className="border border-gray-200 dark:border-gray-600 dark:text-gray-400 font-semibold px-4 py-2">{label}</td>
          <td className="border border-gray-200 dark:border-gray-600 dark:text-gray-400 font-semibold px-4 py-2 break-words">{value}</td>
        </tr>
      );
    }
    return(
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{fooddrive && fooddrive.eventtitle}</h1>
            <Link
              to={`/search?category=${fooddrive && fooddrive.category}`}
              className='self-center mt-5'
            >
              <Button color='gray' pill size='xs'>
                {fooddrive && fooddrive.category}
              </Button>
            </Link>
            <h2 className='mx-auto mt-5 font-semibold text-red-600'>Current Status - {fooddrive && fooddrive.status}</h2>
            <h2 className='mx-auto mt-5 font-semibold text-red-600'>Status Updated Date - {new Date(fooddrive.updatedAt).toLocaleDateString()}</h2>

            {/* Check if the note exists, if it is it will render the div tag and note */}
              {fooddrive && fooddrive.note && (
                <div className="border border-gray-200 rounded p-10 mt-5 bg-white shadow-md">
                  <h2 className='font-semibold text-red-600'>{fooddrive.note}</h2>
                </div>
              )}
              
              <table className="table-fixed w-full mt-10 bg-white shadow-lg dark:bg-gray-900 mb-10">
              <tbody>
                <TableRow label="Title" value={fooddrive && fooddrive.eventtitle} />
                <TableRow label="Category" value={fooddrive && fooddrive.category} />
                <TableRow label="Donor ID" value={fooddrive && fooddrive.dnid} />
                <TableRow label="Donor Email" value={fooddrive && fooddrive.donoremail} />

                {/* Check if group is 'yes' */}
                {fooddrive && fooddrive.group === 'yes' ? (
                    <>
                    <TableRow label="Organization Name" value={fooddrive && fooddrive.ogname} />
                    <TableRow
                        label="Organization Website"
                        value={fooddrive && fooddrive.website ? fooddrive.website : "No website submitted"}
                    />
                    </>
                    ) : (
                        // If group is not 'yes', display a single row
                        <TableRow label="Hosting as a group?" value="No" />
                )}

                <TableRow label="Food drive type" value={fooddrive && fooddrive.type} />
                {/* Check if type is 'onedaydrive' */}
                {fooddrive && fooddrive.type === 'onedaydrive' ? (
                    <>
                    <TableRow label="Event Date" value={fooddrive && fooddrive.eventdate} />
                    <TableRow label="Collecting Time(From)" value={fooddrive && fooddrive.eventtimefrom} />
                    <TableRow label="Collecting Time(To)" value={fooddrive && fooddrive.eventtimeto} />
                    <TableRow label="Collection Point(s)" value={fooddrive && fooddrive.eventlocation} />

                    </>
                    ) : fooddrive && fooddrive.type === 'longdrive' ? (
                      <>
                      <TableRow label="Proposed Start Date" value={fooddrive && fooddrive.DateFrom} />
                      <TableRow label="Proposed End Date" value={fooddrive && fooddrive.DateTo} />
                      <TableRow label="Collection Time(From)" value={fooddrive && fooddrive.eventtimelongfrom} />
                      <TableRow label="Collection Time(To)" value={fooddrive && fooddrive.eventtimelongto} />
                      <TableRow label="Collection Point(s)" value={fooddrive && fooddrive.eventlocationlong} />
                  </>
                ) : (
                      // If the type is neither 'onedaydrive' nor 'longdrive'
                      <TableRow label="Proposed Date(From)" value={fooddrive && fooddrive.DateFrom} />
                )}

                <TableRow label="No. of volunteers needed" value={fooddrive && fooddrive.volunteers} />
                <TableRow label="Purpose and goals" value={fooddrive && fooddrive.eventdescription} />
                <TableRow label="Nearest FoodBank to handover" value={fooddrive && fooddrive.foodbank} />
                <TableRow
                        label="Special Requirements"
                        value={fooddrive && fooddrive.requirements ? fooddrive.requirements : "No requirements submitted"}
                />
                <TableRow label="Request created Date" value={fooddrive && fooddrive.createdAt} />
                <TableRow label="Status Updated Date" value={fooddrive && fooddrive.updatedAt} />
                <TableRow
                         label="FoodDrive Plan"
                         value={
                         fooddrive && fooddrive.image1 ? (
                        <img
                             src={fooddrive.image1}
                             alt={fooddrive.eventtitle}
                             className="p-3 h-[700px] w-[500px] object-cover mx-auto"
                        />
                ) : (
                    "No documents submitted"
                )
                }
                />
                 <TableRow
                         label="Safety Protocol Document"
                         value={
                         fooddrive && fooddrive.image2 ? (
                        <img
                             src={fooddrive.image2}
                             alt={fooddrive.eventtitle}
                             className="p-3 h-[700px] w-[500px] object-cover mx-auto"
                        />
                ) : (
                    "No documents submitted"
                )
                }
                />

                <TableRow
                         label="Past Experience document"
                         value={
                         fooddrive && fooddrive.image3 ? (
                        <img
                             src={fooddrive.image3}
                             alt={fooddrive.eventtitle}
                             className="p-3 h-[700px] w-[500px] object-cover mx-auto"
                        />
                ) : (
                    "No documents submitted"
                )
                }
                />
              </tbody>
            </table>
        </main>
    )
}
