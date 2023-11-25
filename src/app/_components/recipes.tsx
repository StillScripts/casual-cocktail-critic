import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { RecipeActions } from "./recipe-actions";

export const Recipies = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const recipes = await api.recipe.getRecipes.query();

  return (
    <div className="container">
      {recipes?.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <Card key={recipe.id}>
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-end justify-end">
                <RecipeActions id={recipe.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>You have no recipes yet.</p>
      )}
    </div>
  );
};
