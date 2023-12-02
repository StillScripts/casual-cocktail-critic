'use client'

import { type Recipe } from '@/app/_components/new-review/create-review'
import { UpdateReview } from '@/app/_components/new-review/update-review'

import { DeleteReview } from './delete'
import type { Review } from './types'

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
