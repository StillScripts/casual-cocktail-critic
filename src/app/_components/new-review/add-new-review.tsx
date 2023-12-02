"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateReviewForm } from "@/app/_components/new-review/create-review-form";
import { useState } from "react";
import { StarIcon } from "@radix-ui/react-icons";

export interface Recipe {
  name: string | null;
  id: number;
  description: string | null;
  instructions: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export const AddNewReview = ({ recipe }: { recipe: Recipe }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-yellow-600 hover:text-yellow-700"
          variant="ghost"
          size="sm"
        >
          <StarIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Cocktail Rating</DialogTitle>
        <DialogDescription>
          Add a rating and feedback for the {recipe.name} cocktail.
        </DialogDescription>
        <CreateReviewForm close={() => setOpen(false)} recipeId={recipe.id} />
      </DialogContent>
    </Dialog>
  );
};
