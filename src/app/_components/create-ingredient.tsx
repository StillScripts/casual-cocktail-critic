"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";

export const CreateIngredient = ({
  mutate,
}: {
  mutate: (name: string) => void;
}) => {
  const [ingredient, setIngredient] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="ml-3 mt-2"
        >
          Create New Ingredient Option
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cocktail Ingredient</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new ingredient option
          </AlertDialogDescription>
        </AlertDialogHeader>

        <FormLabel>Ingredient</FormLabel>
        <FormControl>
          <Input
            placeholder="Sugar"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </FormControl>
        <FormDescription>
          Add this new ingredient so that you can start adding it to recipes.
        </FormDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              onClick={() => {
                if (ingredient.length > 0) {
                  mutate(ingredient);
                }
              }}
            >
              Save
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
