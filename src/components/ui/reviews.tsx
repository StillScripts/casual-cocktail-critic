import type { RouterOutput } from "@/server/api/root";

type Reviews =
  RouterOutput["recipe"]["getWithReviews"][number]["recipeReviews"];

export const Reviews = ({ reviews }: { reviews: Reviews }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {reviews.map((review) => (
        <li key={review.id} className="flex gap-x-4 py-5">
          {review.user?.image && (
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={review.user.image}
              alt={review.user.name + " profile"}
            />
          )}
          <div className="flex-auto">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {review.user.name}
              </p>
              {/* <p className="flex-none text-xs text-gray-600">
                <time dateTime={comment.dateTime}>{comment.date}</time>
              </p> */}
            </div>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
              {review.feedback}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
