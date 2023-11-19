"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { FormContainer } from "@/components/ui/form-container";
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

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
] as const;

const recipeFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  description: z.string(),
  language: z.string({
    required_error: "Please select a language.",
  }),
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

export function EditRecipeForm({ name }: { name: string }) {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: { name },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  function onSubmit(data: RecipeFormValues) {
    alert(JSON.stringify(data, null, 2));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <FormContainer title="Edit Recipe">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        Name of each ingredient
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
                    Select an option from the menu below or add a new ingredient
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ingredients List</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? languages.find(
                                    (language) =>
                                      language.value === field.value,
                                  )?.label
                                : "Select ingredient"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 md:max-h-16">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                              {languages.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue("language", language.value);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      language.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {language.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        This is the language that will be used in the dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Button type="submit">Update account</Button>
        </form>
      </Form>
    </FormContainer>
  );
}
