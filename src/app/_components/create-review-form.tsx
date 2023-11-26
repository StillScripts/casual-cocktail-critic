"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitButton } from "@/components/ui/submit-button";

const recipeFormSchema = z.object({
  feedback: z.string().min(2, {
    message: "Feedback is required",
  }),
  rating: z.number(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export function CreateReviewForm({ close }: { close: () => void }) {
  const router = useRouter();
  const createRecipe = api.recipe.create.useMutation();
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
  });

  function onSubmit(data: RecipeFormValues) {
    // createRecipe.mutate({
    //   name: data.name,
    //   description: data.description ?? "",
    // });
  }

  useEffect(() => {
    if (createRecipe?.isSuccess) {
      close();
      router.refresh();
    }
  }, [close, createRecipe?.isSuccess, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea placeholder="Your feedback" {...field} />
              </FormControl>
              <FormDescription>
                Describe your experience of the cocktail and explain your rating
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder="Your rating" {...field} />
              </FormControl>
              <FormDescription>
                Give the cocktail a rating out of 5
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={createRecipe.isLoading}>
          Add Your Rating
        </SubmitButton>
      </form>
    </Form>
  );
}
