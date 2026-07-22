import ReviewCards from "../component/cards/reviewCards";
import { useMyReviews } from "../hooks/useMyReviews";

const userImageBaseUrl = `${import.meta.env.VITE_API_URL}/img/users`;

const MyReviews = () => {
  const { data: reviews } = useMyReviews();

  return (
    <main className="min-h-[calc(100vh-18rem)] bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Your travel stories
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Reviews
          </h1>
          <p className="mt-3 text-slate-600">
            Every review helps other travelers plan their next adventure.
          </p>
        </div>

        <ReviewCards reviews={reviews ?? []} userImageBaseUrl={userImageBaseUrl} />
      </section>
    </main>
  );
};

export default MyReviews;
