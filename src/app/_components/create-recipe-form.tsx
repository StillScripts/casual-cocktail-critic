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
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  description: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export function CreateRecipeForm({ close }: { close: () => void }) {
  const router = useRouter();
  const createRecipe = api.recipe.create.useMutation();
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
  });

  function onSubmit(data: RecipeFormValues) {
    createRecipe.mutate({
      name: data.name,
      description: data.description ?? "",
    });
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the cocktail recipe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Your description" {...field} />
              </FormControl>
              <FormDescription>
                Summarise the cocktail recipe and highlight what it&apos;s
                suited for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={createRecipe.isLoading}>
          Add New Recipe
        </SubmitButton>
      </form>
    </Form>
  );
}
