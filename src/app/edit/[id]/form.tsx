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
import { RouterOutput } from "@/server/api/root";

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
  ingredients: z
    .array(
      z.object({
        // value would be the id of the ingredient
        value: z.string(),
        quantity: z.string(),
      }),
    )
    .optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export function EditRecipeForm({
  name,
  recipes,
}: {
  name: string;
  recipes: RouterOutput["recipe"]["getRecipe"];
}) {
  const recipe = recipes[0];
  //const createIngredients = api.recipeIngredient.createMultiple.useMutation();
  const editRecipe = api.recipe.update.useMutation();

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: recipe?.name ?? "",
      description: recipe?.description ?? "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  function onSubmit(data: RecipeFormValues) {
    console.log("submitting");
    alert(JSON.stringify(data, null, 2));
    if (recipe)
      editRecipe.mutate({
        id: recipe.id,
        name: data.name,
        description: data.description ?? "",
      });
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
                  name={`ingredients.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Cocktail Ingredients
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Select ingredient from list
                      </FormDescription>
                      <FormControl>
                        <Input {...field} placeholder="Vanilla Vodka" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    // TODO maybe we can use the combobox...
                    // <FormItem className="flex flex-col">
                    //   <FormLabel className={cn(index !== 0 && "sr-only")}>
                    //     Cocktail Ingredients
                    //   </FormLabel>
                    //   <FormDescription className={cn(index !== 0 && "sr-only")}>
                    //     Add ingredients to your list
                    //   </FormDescription>
                    //   <Popover>
                    //     <PopoverTrigger asChild>
                    //       <FormControl>
                    //         <Button
                    //           variant="outline"
                    //           role="combobox"
                    //           className={cn(
                    //             "w-full justify-between",
                    //             !field.value && "text-muted-foreground",
                    //           )}
                    //         >
                    //           {field.value
                    //             ? languages.find(
                    //                 (language) => language.value === field.value,
                    //               )?.label
                    //             : "Select ingredient"}
                    //           <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    //         </Button>
                    //       </FormControl>
                    //     </PopoverTrigger>
                    //     <PopoverContent className="w-[200px] p-0">
                    //       <Command>
                    //         <CommandInput placeholder="Search language..." />
                    //         <CommandEmpty>No language found.</CommandEmpty>
                    //         <CommandGroup>
                    //           {languages.map((language) => (
                    //             <CommandItem
                    //               value={language.label}
                    //               key={language.value}
                    //               onSelect={() => {
                    //                 form.setValue("language", language.value);
                    //               }}
                    //             >
                    //               <CheckIcon
                    //                 className={cn(
                    //                   "mr-2 h-4 w-4",
                    //                   language.value === field.value
                    //                     ? "opacity-100"
                    //                     : "opacity-0",
                    //                 )}
                    //               />
                    //               {language.label}
                    //             </CommandItem>
                    //           ))}
                    //         </CommandGroup>
                    //       </Command>
                    //     </PopoverContent>
                    //   </Popover>

                    //   <FormMessage />
                    // </FormItem>
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
                    onClick={() => remove(index)}
                  >
                    <Cross1Icon />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "", quantity: "" })}
            >
              Add Ingredient
            </Button>
            {/* <CreateIngredient mutate={mutate} /> */}
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </FormContainer>
  );
}
