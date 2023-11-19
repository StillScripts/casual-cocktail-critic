import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { ingredients } from "@/server/db/schema";

export const ingredientRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(ingredients).values({
        name: input.name,
      });
    }),

  getIngredient: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.query.ingredients.findMany({
        where: (ingredients, { eq }) => eq(ingredients.id, input.id),
      });
    }),

  getIngredients: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.ingredients.findMany();
  }),
});
