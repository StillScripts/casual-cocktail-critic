import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { recipes } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const recipeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(recipes).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(recipes)
        .set({ name: input.name, description: input.description })
        .where(eq(recipes.id, input.id));
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
