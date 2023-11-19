import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

const EditRecipe = async ({ params }: { params: { id: string } }) => {
  const recipes = await api.recipe.getRecipe.query({ id: parseInt(params.id) });
  const recipe = recipes ? recipes[0] : null;
  if (!recipe) {
    return <h2>Recipe Not Found</h2>;
  }
  return (
    <form>
      <div>Editing {recipe.name}</div>
    </form>
  );
};

export default EditRecipe;
