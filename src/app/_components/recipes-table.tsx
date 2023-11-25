import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecipeActions } from "./recipe-actions";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export const RecipesTable = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const recipes = await api.recipe.getRecipes.query();
  return (
    <Table>
      <TableCaption>A list of recipes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[140px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipes.map((recipe) => (
          <TableRow key={recipe.id}>
            <TableCell className="font-medium">{recipe.name}</TableCell>
            <TableCell className="truncate">{recipe.description}</TableCell>
            <RecipeActions id={recipe.id} table />
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>{recipes.length} Recipes</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
