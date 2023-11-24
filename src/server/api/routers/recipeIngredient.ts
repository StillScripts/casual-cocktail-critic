import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { recipeIngredients } from "@/server/db/schema";

export const recipeIngredientRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        quantity: z.string().min(1),
        recipeId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(recipeIngredients).values({
        name: input.name,
        quantity: input.quantity,
        recipeId: input.recipeId,
      });
    }),

  createMultiple: protectedProcedure
    .input(
      z.array(
        z.object({
          name: z.string().min(1),
          quantity: z.string().min(1),
          recipeId: z.number(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const insertValues = input.map(({ name, quantity, recipeId }) => ({
        name,
        quantity,
        recipeId,
      }));

      await ctx.db.insert(recipeIngredients).values(insertValues);
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.recipes.findFirst({
      orderBy: (recipes, { desc }) => [desc(recipes.createdAt)],
    });
  }),

  getRecipe: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.query.recipes.findMany({
        where: (recipes, { eq }) => eq(recipes.id, input.id),
      });
    }),
});
