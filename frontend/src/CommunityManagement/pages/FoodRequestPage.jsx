import React from 'react';
import { Button, Spinner,Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function FoodRequestPage() {
  const { foodrequestSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [foodrequest, setFoodRequest] = useState(null);

  useEffect(() => {
    const fetchFoodRequest = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/foodrequest/getfoodrequests?slug=${foodrequestSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setFoodRequest(data.foodrequests[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchFoodRequest();
  }, [foodrequestSlug]);

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  function TableRow({ label, value }) {
    return (
      <tr>
        <td className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 font-bold px-4 py-2">{label}</td>
        <td className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 font-semibold px-4 py-2">{value}</td>
      </tr>
    );
  }
  

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-bold lg:text-6xl mb-4'>Nourish Lanka  Where hunger ends and nourishment begins</h1>
      <h1 className='text-3xl mt-10 mb-1 p-3 text-center font-bold max-w-2xl mx-auto lg:text-4xl'>Food Request Details</h1>
      <div className='text-center top-0 left-0 bg-red-500 text-white px-3 py-1 rounded-full font-bold'>Status -{foodrequest && foodrequest.status}</div>
      <h1 className='text-3xl mt-3 p-3 text-center font-semibold max-w-2xl mx-auto lg:text-4xl'>District - {foodrequest && foodrequest.district}</h1>
      <h1 className='text-3xl mt-3 p-3 text-center font-semibold max-w-2xl mx-auto lg:text-2xl'>Food Request ID - {foodrequest && foodrequest.foodrequestID}</h1>
      <Link to={`/communitysearch?category=${foodrequest && foodrequest.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs'>
          {foodrequest && foodrequest.category}
        </Button>
      </Link>

      <table className="table-fixed w-full mt-10 border-collapse rounded-lg">
        <tbody>
          <TableRow label="Recipient Name" value={foodrequest && foodrequest.recipientname} />
          <TableRow label="Category" value={foodrequest && foodrequest.category} />
          <TableRow label="Recipient District" value={foodrequest && foodrequest.district} />
          <TableRow label="Recipient Position" value={foodrequest && foodrequest.position ?  foodrequest.position: "No Position Mentioned"} />
          <TableRow label="Recipient Contact Number" value={foodrequest && foodrequest.contactnumber} />
          <TableRow label="Recipient Email" value={foodrequest && foodrequest.email} />
          <TableRow label="Recipient Address" value={foodrequest && foodrequest.address} />
           <TableRow label="Recipient Zipcode" value={foodrequest && foodrequest.zipcode} />
          <TableRow label="Population of the Orphnage" value={foodrequest && foodrequest.porphange ?  foodrequest.porphange: "No Population of the Orphange mentioned"} />
          <TableRow label="Population of the Elders Care Home" value={foodrequest && foodrequest.pelders  ?  foodrequest.pelders: "No Population of the Elders Home mentioned"} />
          <TableRow label="Population of the School" value={foodrequest && foodrequest.pschool  ?  foodrequest.pschool: "No Population of the School mentioned"} />
          <TableRow label="Family incomeLevel" value={foodrequest && foodrequest.incomeLevel  ?  foodrequest.incomeLevel: "No Income Level mentioned"} /> 
           <TableRow label="Household Size" value={foodrequest && foodrequest.householdSize  ?  foodrequest.householdSize: "No House hold size mentioned"} />
          <TableRow label="No of Children" value={foodrequest && foodrequest.nochildren  ?  foodrequest.nochildren: "No number of children  mentioned"} />
          <TableRow label="No of Men" value={foodrequest && foodrequest.nomales  ?  foodrequest.nomales: "No number of males  mentioned"} />
          <TableRow label="No of Females" value={foodrequest && foodrequest.nofemales  ?  foodrequest.nofemales: "No number of females  mentioned"} />

          <TableRow
            label="GramaNiladhari Certificate"
            value={
              foodrequest && foodrequest.image ? (
                <img
                  src={foodrequest.image}
                  alt={foodrequest.recipientname}
                  className="p-3 h-[600px] w-[500px] object-cover mx-auto"
                />
              ) : (
                "No GramaNiladhari Document submitted"
              )
            }
          />
          <TableRow label="Special Needs" value={foodrequest && stripHtmlTags(foodrequest.content) } />
          <TableRow label="Food Request Status" value={foodrequest && foodrequest.status} />
        </tbody>
      </table>

      <div className="flex gap-6 mt-8">
        <Card className="w-full md:w-1/3">
          <div className="card-content">
            <img src="https://t4.ftcdn.net/jpg/03/79/37/21/360_F_379372116_bzN3To7Hd8XPxjLSC1xlPkVrevrh9Vua.jpg" alt="Card 1" className="card-image" />
            <h3 className="text-lg font-bold mb-2 mt-3 text-center"> What is a Food Request?</h3>
            <p className='text-center'>A food request is a vital means for individuals and communities facing food scarcity to articulate their specific needs to Nourish Lanka. It involves filling out a comprehensive form detailing one's location, household size, dietary needs, and other relevant information. This submission serves as a crucial communication channel, enabling Nourish Lanka to understand and address each requester's unique circumstances effectively.</p>
          </div>
        </Card>
        <Card className="w-full md:w-1/3">
          <div className="card-content">
            <img src="https://tru-cape.com/wp-content/uploads/2020/06/Genadendal-Fruit-Donation-family-From-left-to-right.-Annaria-Laitier-Sairley-Fagen-Sherylee-Latier-Sherrell-Latier-Front-left-to-right-Kavin-Latier-Glodene-Latier.Web_.jpg" alt="Card 2" className="card-image" />
            <h3 className="text-lg font-bold mb-2 mt-3 text-center">How it helps people in need of food?</h3>
            <p className='text-center'>Submitting a food request empowers individuals to seek targeted assistance for their food needs. By providing detailed information about their situation, requesters enable Nourish Lanka to mobilize resources effectively, such as food donations or meal deliveries, to alleviate hunger. This direct communication ensures that support reaches those in need promptly and accurately, making a tangible difference in their lives.</p>
          </div>
        </Card>
        <Card className="w-full md:w-1/3">
          <div className="card-content">
            <img src="https://cdn.tatlerasia.com/tatlerasia/i/2023/05/18180941-gettyimages-1433094696_cover_1600x1065.jpeg" alt="Card 3" className="card-image" />
            <h3 className="text-lg font-bold mb-2 mt-3 text-center">How it Works</h3>
            <p className='text-center'>The food request process operates through a streamlined online form, accessible to individuals from various backgrounds. Once submitted, Nourish Lanka reviews each request with care, considering factors like location, household size, and special dietary needs. This information enables the organization to tailor assistance accordingly, mobilizing resources and providing support to individuals and communities facing food insecurity promptly and compassionately.</p>
          </div>
        </Card>
      </div>

    </main>
  );
}
