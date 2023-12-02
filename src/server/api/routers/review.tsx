import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { recipeReviews } from '@/server/db/schema'

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
			await ctx.db.delete(recipeReviews).where(eq(recipeReviews.id, input.id))
		})
})
