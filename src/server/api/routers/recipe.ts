import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { recipes } from "@/server/db/schema";

export const recipeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

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

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
