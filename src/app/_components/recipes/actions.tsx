"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { Cross2Icon, EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AddNewReview, type Recipe } from "../new-review/add-new-review";

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
  const deleteRecipe = api.recipe.delete.useMutation();

  useEffect(() => {
    if (deleteRecipe?.isSuccess) {
      toast({
        title: "Succesful deletion",
        description: "This cocktail recipe was successfully deleted",
      });
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="text-red-600 hover:text-red-700"
                variant="ghost"
                size="sm"
              >
                <Cross2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will delete this cocktail recipe.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteRecipe.mutate({ id })}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
