import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { recipeIngredients, recipes } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";

export const recipeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(recipes).values({
        name: input.name,
        description: input.description,
        createdById: ctx.session.user.id,
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string().optional(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            quantity: z.string(),
            recipeIngredientId: z.number().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Update the recipe
      await ctx.db
        .update(recipes)
        .set({ name: input.name, description: input.description })
        .where(eq(recipes.id, input.id));
      // Create the new recipe ingredients
      const newIngredients = input.ingredients.filter(
        (ingredient) => !ingredient?.recipeIngredientId,
      );
      if (newIngredients.length > 0) {
        await ctx.db.insert(recipeIngredients).values(
          newIngredients.map((ingredient) => ({
            ...ingredient,
            recipeId: input.id,
          })),
        );
      }
      const existingIngredients = input.ingredients.filter(
        (ingredient) => ingredient?.recipeIngredientId,
      );
      if (existingIngredients.length > 0) {
        await Promise.all(
          existingIngredients.map((ingredient) =>
            ctx.db
              .update(recipeIngredients)
              .set({
                name: ingredient.name,
                quantity: ingredient.quantity,
              })
              .where(eq(recipeIngredients.id, ingredient.recipeIngredientId!)),
          ),
        );
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(recipes).where(eq(recipes.id, input.id));
    }),

  deleteRecipeIngredients: protectedProcedure
    .input(z.array(z.number()))
    .mutation(async ({ ctx, input }) => {
      if (input.length > 0) {
        await Promise.all(
          input.map((id) =>
            ctx.db
              .delete(recipeIngredients)
              .where(eq(recipeIngredients.id, id)),
          ),
        );
      }
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.recipes.findFirst({
      orderBy: (recipes, { desc }) => [desc(recipes.createdAt)],
    });
  }),

  getSingle: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.query.recipes.findMany({
        where: eq(recipes.id, input.id),
        with: {
          recipeIngredients: true,
        },
      });
    }),

  getWithReviews: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.query.recipes.findMany({
        where: eq(recipes.id, input.id),
        with: {
          recipeIngredients: true,
          recipeReviews: {
            with: {
              user: true,
            },
          },
        },
      });
    }),

  getRecipes: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.recipes.findMany({
      orderBy: [desc(recipes.createdAt)],
    });
  }),
});
