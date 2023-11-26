"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateRecipeForm } from "@/app/_components/create-recipe-form";
import { useState } from "react";

export const AddNewRecipe = () => {
  const [forceClose, setForceClose] = useState(false);
  return (
    <Dialog open={forceClose ? false : undefined}>
      <DialogTrigger asChild>
        <Button>Add New Cocktail Recipe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Cocktail</DialogTitle>
        <CreateRecipeForm close={() => setForceClose(true)} />
      </DialogContent>
    </Dialog>
  );
};
