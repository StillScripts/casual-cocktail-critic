'use client'

import { useRouter } from 'next/navigation'

import { Pencil2Icon } from '@radix-ui/react-icons'

import { type Recipe } from '@/app/_components/new-review/create-review'
import { UpdateReview } from '@/app/_components/new-review/update-review'
import { Button } from '@/components/ui/button'

import type { Review } from './types'

// import { DeleteRecipe } from './delete'

export const ReviewActions = ({
	recipe,
	review
}: {
	recipe: Recipe
	review: Review
}) => {
	const router = useRouter()

	return (
		<div className="no-wrap flex">
			<UpdateReview recipe={recipe} review={review} />
			{/* <DeleteRecipe id={id} /> */}
		</div>
	)
}
