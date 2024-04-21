import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function DonationPage() {
    const { donationSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [donation, setDonation] = useState(null);


    useEffect(() => {
        const fetchDonation = async () => {
            try {
              setLoading(true);
              const res = await fetch(`/api/donation/getdonations?slug=${donationSlug}`);
              const data = await res.json();
              if (!res.ok) {
                setError(true);
                setLoading(false);
                return;
              }
              if (res.ok) {
                setDonation(data.donations[0]);
                setLoading(false);
                setError(false);
              }
            } catch (error) {
              setError(true);
              setLoading(false);
            }
          };
          fetchDonation();
    },[donationSlug]);

    if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

    function TableRow({ label, value }) {
        return (
          <tr>
            <td className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 font-semibold px-4 py-2">{label}</td>
            <td className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 font-semibold px-4 py-2 break-words">{value}</td>
          </tr>
        );
      }
    return(
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{donation && donation.eventtitle}</h1>
            <Link
              to={`/search?category=${donation && donation.category}`}
              className='self-center mt-5'
            >
              <Button color='gray' pill size='xs'>
                {donation && donation.category}
              </Button>
            </Link>
            <h2 className='mx-auto mt-5 font-semibold text-red-600'>Current Event Status - {donation && donation.status}</h2>

             {/* Check if the note exists, if it is it will render the div tag and note */}
            {donation && donation.note && (
                <div className="border border-gray-200 rounded p-10 mt-5 bg-white shadow-md">
                  <h2 className='font-semibold text-red-600'>{donation.note}</h2>
                </div>
              )}

            <table className="table-fixed w-full mt-10" >
              <tbody>
                <TableRow label="Title" value={donation && donation.eventtitle} />
                <TableRow label="Category" value={donation && donation.category} />
                <TableRow label="Donor ID" value={donation && donation.dnid} />
                <TableRow label="Donor Email" value={donation && donation.donoremail} />
                <TableRow label="Proposed Event Date" value={donation && donation.eventdate} />
                <TableRow label="Event Starting time" value={donation && donation.eventtime} />
                <TableRow label="Event Location" value={donation && donation.eventlocation} />
                <TableRow label="Event Description" value={donation && donation.eventdescription} />
                <TableRow label="Event Budget" value={donation && donation.budget} />
                <TableRow label="Request created Date" value={donation && donation.createdAt} />
                <TableRow label="Status Updated Date" value={donation && donation.updatedAt} />
                <TableRow
                         label="Proof of financial documents"
                         value={
                         donation && donation.image1 ? (
                        <img
                             src={donation.image1}
                             alt={donation.eventtitle}
                             className="p-3 h-[700px] w-[500px] object-cover mx-auto"
                        />
                ) : (
                    "No documents submitted"
                )
                }
                />
                 <TableRow label="No. of Attendees expecting" value={donation && donation.attendees} />
                 <TableRow label="No. of volunteers needed" value={donation && donation.volunteers} />
                 <TableRow
                         label="Event Proposal Plan"
                         value={
                         donation && donation.image2 ? (
                        <img
                             src={donation.image2}
                             alt={donation.eventtitle}
                             className="p-3 h-[700px] w-[500px] object-cover mx-auto"
                        />
                ) : (
                    "No documents submitted"
                )
                }
                />

                <TableRow
                         label="Partnership Agreement Document"
                         value={
                         donation && donation.image3 ? (
                        <img
                             src={donation.image3}
                             alt={donation.eventtitle}
                             className="p-3 h-[700px] w-[500px] object-cover mx-auto"
                        />
                ) : (
                    "No documents submitted"
                )
                }
                />
                <TableRow
                        label="Concerns and Requests"
                        value={donation && donation.conserns ? donation.conserns : "No concerns and requests"}
                />
              </tbody>
            </table>
        </main>
    )
}

