import { RecipesTable } from "@/app/_components/recipes-table";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cocktails Collection",
};

const RecipesPage = () => {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-16">
      <div className="mb-12 flex w-full items-end justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Cocktails Collection
        </h1>
        <Button asChild>
          <Link href="/create">Add New Cocktail Recipe</Link>
        </Button>
      </div>
      <RecipesTable />
    </main>
  );
};

export default RecipesPage;
