import { createTRPCRouter } from "@/server/api/trpc";
import { ingredientRouter } from "@/server/api/routers/ingredient";
import { recipeRouter } from "@/server/api/routers/recipe";
import type { inferRouterOutputs } from "@trpc/server";
import { recipeIngredientRouter } from "./routers/recipeIngredient";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ingredient: ingredientRouter,
  recipe: recipeRouter,
  recipeIngredient: recipeIngredientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
