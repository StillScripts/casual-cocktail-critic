'use client'

import type { Review } from '@/app/_components/reviews/types'

import { type Recipe } from './create'
import { DeleteReview } from './delete'
import { UpdateReview } from './update'

export const ReviewActions = ({
	recipe,
	review
}: {
	recipe: Recipe
	review: Review
}) => {
	return (
		<div className="no-wrap flex">
			<UpdateReview recipe={recipe} review={review} />
			<DeleteReview id={review.id} />
		</div>
	)
}
