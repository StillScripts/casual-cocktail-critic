"use client";

import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import {
  AddNewReview,
  type Recipe,
} from "@/app/_components/new-review/add-new-review";
import { DeleteRecipe } from "./delete";

export const RecipeActions = ({
  id,
  recipe,
  table,
}: {
  id: number;
  recipe: Recipe;
  table?: boolean;
}) => {
  const router = useRouter();

  const Buttons = () => (
    <div className="no-wrap flex">
      <Button
        className="text-green-700 hover:text-green-800"
        variant="ghost"
        size="sm"
        onClick={() => {
          router.push(`/edit/${id}`);
        }}
      >
        <Pencil2Icon />
      </Button>
      <AddNewReview recipe={recipe} />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          router.push(`/view/${id}`);
        }}
      >
        <EyeOpenIcon />
      </Button>
      <DeleteRecipe id={id} />
    </div>
  );
  if (table) {
    return (
      <TableCell>
        <Buttons />
      </TableCell>
    );
  }
  return (
    <div className="flex">
      <Buttons />
    </div>
  );
};
