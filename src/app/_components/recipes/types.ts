import type { RouterOutput } from '@/server/api/root'

export type RecipeWithReviews = RouterOutput['recipe']['getWithReviews'][number]
