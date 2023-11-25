import { RecipesTable } from "@/app/_components/recipes-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cocktails Collection",
};

const RecipesPage = () => {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center">
      <RecipesTable />
    </main>
  );
};

export default RecipesPage;
