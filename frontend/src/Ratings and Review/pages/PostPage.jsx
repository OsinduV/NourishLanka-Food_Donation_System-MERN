import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import reviewCard from '../components/reviewCard';

export default function reviewPage() {
  const { reviewSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [review, setreview] = useState(null);
  const [recentreviews, setRecentreviews] = useState(null);

  useEffect(() => {
    const fetchreview = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/review/getreviews?slug=${reviewSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setreview(data.reviews[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchreview();
  }, [reviewSlug]);

  useEffect(() => {
    try {
      const fetchRecentreviews = async () => {
        const res = await fetch(`/api/review/getreviews?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentreviews(data.reviews);
        }
      };
      fetchRecentreviews();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {review && review.title}
      </h1>
      <Link
        to={`/search?category=${review && review.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {review && review.category}
        </Button>
      </Link>
      <img
        src={review && review.image}
        alt={review && review.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{review && new Date(review.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {review && (review.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full review-content'
        dangerouslySetInnerHTML={{ __html: review && review.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection reviewId={review._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentreviews &&
            recentreviews.map((review) => <reviewCard key={review._id} review={review} />)}
        </div>
      </div>
    </main>
  );
}