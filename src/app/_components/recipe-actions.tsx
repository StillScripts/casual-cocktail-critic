"use client";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { api } from "@/trpc/react";
import { Cross2Icon, EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const RecipeActions = ({
  id,
  table,
}: {
  id: number;
  table?: boolean;
}) => {
  const router = useRouter();
  const deleteRecipe = api.recipe.delete.useMutation();

  if (table) {
    return (
      <div className="flex">
        <TableCell>
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
        </TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              router.push(`/view/${id}`);
            }}
          >
            <EyeOpenIcon />
          </Button>
        </TableCell>
        <TableCell>
          <Button
            className="text-red-600 hover:text-red-700"
            variant="ghost"
            size="sm"
            onClick={() => deleteRecipe.mutate({ id })}
          >
            <Cross2Icon />
          </Button>
        </TableCell>
      </div>
    );
  }
  return (
    <div className="flex">
      <Button
        className="text-green-600 hover:text-green-700"
        variant="ghost"
        size="sm"
        onClick={() => {
          router.push(`/edit/${id}`);
        }}
      >
        <Pencil2Icon />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          router.push(`/view/${id}`);
        }}
      >
        <EyeOpenIcon />
      </Button>
      <Button
        className="text-red-600 hover:text-red-700"
        variant="ghost"
        size="sm"
        onClick={() => deleteRecipe.mutate({ id })}
      >
        <Cross2Icon />
      </Button>
    </div>
  );
};
