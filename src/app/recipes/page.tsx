import { RecipesTable } from "@/app/_components/recipes-table";
import type { Metadata } from "next";
import { Suspense } from "react";
import { AddNewRecipe } from "@/app/_components/add-new-recipe";

export const metadata: Metadata = {
  title: "Cocktails Collection",
};

const RecipesPage = () => {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-16">
      <div className="mb-12 flex w-full flex-col items-center justify-between sm:flex-row sm:items-end">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:mb-0 sm:text-4xl">
          Cocktail Collection
        </h1>
        <AddNewRecipe />
      </div>
      <Suspense fallback={null}>
        <RecipesTable />
      </Suspense>
    </main>
  );
};

export default RecipesPage;
