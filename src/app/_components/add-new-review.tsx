"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateReviewForm } from "@/app/_components/create-review-form";
import { useEffect, useState } from "react";
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
  const [forceClose, setForceClose] = useState(false);
  useEffect(() => {
    setForceClose(false);
  }, []);
  return (
    <Dialog open={forceClose ? false : undefined}>
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
        <CreateReviewForm
          close={() => setForceClose(true)}
          recipeId={recipe.id}
        />
      </DialogContent>
    </Dialog>
  );
};
