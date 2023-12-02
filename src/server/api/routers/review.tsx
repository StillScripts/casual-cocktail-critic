import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure
} from '@/server/api/trpc'
import { recipeIngredients, recipeReviews, recipes } from '@/server/db/schema'

export const reviewRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				feedback: z.string().min(2),
				rating: z.number(),
				recipeId: z.number()
			})
		)
		.mutation(async ({ ctx, input: { feedback, rating, recipeId } }) => {
			await ctx.db.insert(recipeReviews).values({
				feedback,
				rating,
				recipeId,
				createdById: ctx.session.user.id
			})
		}),
	update: protectedProcedure
		.input(
			z.object({
				feedback: z.string().min(2),
				rating: z.number(),
				id: z.number()
			})
		)
		.mutation(async ({ ctx, input: { feedback, rating, id } }) => {
			// Update the recipe
			await ctx.db
				.update(recipeReviews)
				.set({ feedback, rating })
				.where(eq(recipeReviews.id, id))
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.delete(recipes).where(eq(recipes.id, input.id))
		}),

	deleteRecipeIngredients: protectedProcedure
		.input(z.array(z.number()))
		.mutation(async ({ ctx, input }) => {
			if (input.length > 0) {
				await Promise.all(
					input.map(id =>
						ctx.db.delete(recipeIngredients).where(eq(recipeIngredients.id, id))
					)
				)
			}
		}),

	getLatest: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.recipes.findFirst({
			orderBy: (recipes, { desc }) => [desc(recipes.createdAt)]
		})
	}),

	getRecipe: publicProcedure
		.input(z.object({ id: z.number().min(1) }))
		.query(({ ctx, input }) => {
			return ctx.db.query.recipes.findMany({
				where: eq(recipes.id, input.id),
				with: {
					recipeIngredients: true
				}
			})
		}),

	getRecipes: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.recipes.findMany({
			orderBy: [desc(recipes.createdAt)]
		})
	})
})
