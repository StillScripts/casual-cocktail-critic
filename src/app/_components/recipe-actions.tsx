"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Cross2Icon, EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const RecipeActions = ({ id }: { id: number }) => {
  const router = useRouter();
  const deleteRecipe = api.recipe.delete.useMutation();
  return (
    <div className="flex">
      <Button
        className="text-red-600 hover:text-red-700"
        variant="ghost"
        size="sm"
        onClick={() => deleteRecipe.mutate({ id })}
      >
        <Cross2Icon />
      </Button>
      <Button
        className="text-pink-600 hover:text-pink-700"
        variant="ghost"
        size="sm"
        onClick={() => {
          router.push(`/edit/${id}`);
        }}
      >
        <Pencil2Icon />
      </Button>
      <Button variant="ghost" size="sm">
        <EyeOpenIcon />
      </Button>
    </div>
  );
};
