import { api } from "@/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

const ViewRecipePage = async ({ params }: { params: { id: string } }) => {
  const recipes = await api.recipe.getWithReviews.query({
    id: parseInt(params.id),
  });
  const recipe = recipes ? recipes[0] : null;
  if (!recipe) {
    return <h2>Recipe Not Found</h2>;
  }

  return (
    <div className="min-h-screen p-16">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>{recipe?.name}</CardTitle>
          <CardDescription>{recipe?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {recipe?.recipeIngredients?.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} {ingredient.quantity}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <ul>
        {recipe?.recipeReviews?.map((review) => (
          <li className="my-4" key={"review" + review.id}>
            {review.feedback}{" "}
            <span className="font-medium text-gray-600">
              {review.rating}/10
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRecipePage;
