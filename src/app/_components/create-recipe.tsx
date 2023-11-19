"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { api } from "@/trpc/react";

export function CreateRecipe({
  recipe,
}: {
  recipe: { id: string; name: string };
}) {
  const router = useRouter();
  const [name, setName] = useState("");

  const createRecipe = api.recipe.create.useMutation();

  useEffect(() => {
    if (createRecipe?.isSuccess) {
      if (recipe.name === name) {
        router.push(`/edit/${recipe.id}`);
      }
    }
  }, [createRecipe?.isSuccess, name, recipe, router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createRecipe.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
        required
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createRecipe.isLoading}
      >
        {createRecipe.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
