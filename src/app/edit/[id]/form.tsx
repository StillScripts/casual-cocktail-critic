"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { FormContainer } from "@/components/ui/form-container";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import type { RouterOutput } from "@/server/api/root";
import { useState } from "react";

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
  ingredients: z.array(
    z.object({
      name: z.string().min(1, { message: "Required field" }),
      quantity: z.string().min(1, { message: "Required field" }),
      recipeIngredientId: z.number().optional(),
    }),
  ),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export function EditRecipeForm({
  recipes,
}: {
  recipes: RouterOutput["recipe"]["getRecipe"];
}) {
  const recipe = recipes[0];
  const editRecipe = api.recipe.update.useMutation();
  const deleteRecipeIngredients =
    api.recipe.deleteRecipeIngredients.useMutation();
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: recipe?.name ?? "",
      description: recipe?.description ?? "",
      // @ts-expect-error (need to work on null/undefined issue)
      ingredients: recipe?.recipeIngredients.length
        ? recipe.recipeIngredients.map((r) => ({
            ...r,
            recipeIngredientId: r.id,
          }))
        : [{ name: "", quantity: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });
  const [removed, setRemoved] = useState<number[]>([]);

  function onSubmit(data: RecipeFormValues) {
    if (recipe)
      editRecipe.mutate({
        id: recipe.id,
        name: data.name,
        description: data.description ?? "",
        ingredients: data.ingredients ?? [],
      });
    if (removed.length > 0) {
      deleteRecipeIngredients.mutate(removed);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setRemoved([]);
  }

  return (
    <FormContainer title="Edit Recipe">
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
                  This is the name that will be displayed on your profile and in
                  emails.
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

          <div>
            {fields.map((field, index) => (
              <div className="grid grid-cols-5 gap-3" key={field.id}>
                <FormField
                  control={form.control}
                  name={`ingredients.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Cocktail Ingredients
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Name of each ingredient
                      </FormDescription>
                      <FormControl>
                        <Input {...field} placeholder="Vanilla Vodka" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="col-span-2 flex items-end space-x-2">
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Quantity
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Quantity of each ingredient
                        </FormDescription>
                        <FormControl>
                          <Input {...field} placeholder="1 ounce" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="text-red-600 hover:text-red-700"
                    variant="ghost"
                    onClick={() => {
                      if (field.recipeIngredientId) {
                        setRemoved([...removed, field.recipeIngredientId]);
                      }
                      remove(index);
                    }}
                  >
                    <Cross1Icon /> {field.recipeIngredientId}
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ name: "", quantity: "" })}
            >
              Add Ingredient
            </Button>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </FormContainer>
  );
}
