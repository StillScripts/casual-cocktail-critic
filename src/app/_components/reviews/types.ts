import type { RouterOutput } from '@/server/api/root'

export type Reviews =
	RouterOutput['recipe']['getWithReviews'][number]['recipeReviews']
export type Review = Reviews[number]
