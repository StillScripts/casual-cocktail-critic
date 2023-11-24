import { api } from "@/trpc/server";
import { EditRecipeForm } from "./form";

export const dynamic = "force-dynamic";

const EditRecipePage = async ({ params }: { params: { id: string } }) => {
  const recipes = await api.recipe.getRecipe.query({ id: parseInt(params.id) });
  const recipe = recipes ? recipes[0] : null;
  if (!recipe) {
    return <h2>Recipe Not Found</h2>;
  }
  return (
    <div className="min-h-screen bg-neutral-300 p-16">
      <EditRecipeForm name={recipe.name!} recipes={recipes} />
    </div>
  );
};

export default EditRecipePage;
