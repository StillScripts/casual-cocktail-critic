import { api } from "@/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reviews } from "@/components/ui/reviews";

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
    <div>
      <div className="container py-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>{recipe?.name}</CardTitle>
            <CardDescription>{recipe?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Ingredients:</p>
            <ul className="ml-4 list-decimal text-sm">
              {recipe?.recipeIngredients?.map((ingredient) => (
                <li key={ingredient.id}>
                  <span className="font-bold">{ingredient.name}</span>&nbsp;
                  <span className="text-xs text-muted-foreground">
                    ({ingredient.quantity})
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted py-8">
        <div className="container">
          <h4 className="text-xl font-medium">Reviews</h4>
          <Reviews reviews={recipe.recipeReviews} />
        </div>
      </div>
    </div>
  );
};

export default ViewRecipePage;
