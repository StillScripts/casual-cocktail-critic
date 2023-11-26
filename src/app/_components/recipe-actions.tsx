"use client";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { api } from "@/trpc/react";
import {
  Cross2Icon,
  EyeOpenIcon,
  Pencil2Icon,
  StarIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RecipeActions = ({
  id,
  table,
}: {
  id: number;
  table?: boolean;
}) => {
  const router = useRouter();
  const deleteRecipe = api.recipe.delete.useMutation();

  useEffect(() => {
    if (deleteRecipe?.isSuccess) {
      router.refresh();
    }
  }, [deleteRecipe?.isSuccess, router]);

  if (table) {
    return (
      <TableCell>
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
          <Button
            className="text-yellow-600 hover:text-yellow-700"
            variant="ghost"
            size="sm"
            onClick={() => {
              alert("ratings coming soon");
            }}
          >
            <StarIcon />
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
      </TableCell>
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
