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

  const recipes = await api.recipe.getSingles.query();
  return (
    <Table>
      <TableCaption>A list of recipes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[140px]">Title</TableHead>
          <TableHead className="hidden sm:block">Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipes.map((recipe) => (
          <TableRow key={recipe.id}>
            <TableCell className="font-medium">{recipe.name}</TableCell>
            <TableCell className="hidden truncate sm:block">
              {recipe.description}
            </TableCell>
            <RecipeActions id={recipe.id} recipe={recipe} table />
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>{recipes.length}</TableCell>
          <TableCell className="hidden sm:block"></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
