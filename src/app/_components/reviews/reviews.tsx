import Image from 'next/image'

import { StarFilledIcon } from '@radix-ui/react-icons'

import { type RecipeWithReviews } from '@/app/_components/recipes/types'

import { ReviewActions } from './actions/toolbar'
import type { Reviews as ReviewsType } from './types'

export const Reviews = ({
	recipe,
	reviews,
	userId
}: {
	recipe: RecipeWithReviews
	reviews: ReviewsType
	userId: string
}) => {
	const getStars = (rating: number | null) => {
		if (rating === null) return null

		const filled = Math.floor(rating / 2)
		const filledStars: string[] = []
		const outlinedStars: string[] = []
		for (let i = 0; i < 5; i++) {
			if (filled > i) {
				filledStars.push(`filled-${i}`)
			} else {
				outlinedStars.push(`outlined-${i}`)
			}
		}
		return {
			filledStars,
			outlinedStars
		}
	}

	return (
		<ul role="list" className="divide-y divide-gray-300">
			{reviews.map(review => {
				const stars = getStars(review.rating)
				return (
					<li key={review.id} className="flex gap-x-4 py-5">
						{review.user?.image && (
							<Image
								className="h-12 w-12 flex-none rounded-full bg-gray-50"
								src={review.user.image}
								alt={review.user.name + ' profile'}
								height={48}
								width={48}
							/>
						)}
						<div className="max-w-lg flex-auto xl:max-w-xl">
							<div className="flex items-baseline justify-between gap-x-4">
								<p className="font-semibold leading-6 text-gray-900">
									{review.user.name}
								</p>
								<div className="flex items-end space-x-1">
									{stars && (
										<div className="flex items-center">
											{stars.filledStars.map(key => (
												<StarFilledIcon key={key} className="text-yellow-600" />
											))}
											{stars.outlinedStars.map(key => (
												<StarFilledIcon
													key={key}
													className="text-neutral-300"
												/>
											))}
										</div>
									)}

									<p className="flex-none text-xs text-muted-foreground">
										({review.rating}/10)
									</p>
								</div>
							</div>
							<p className="mt-1 text-sm leading-6 text-muted-foreground">
								{review.feedback}
							</p>
							{review.image && (
								<Image
									className="max-w-full"
									src={review.image}
									width={200}
									height={200}
									alt="Cocktail image"
								/>
							)}
							{userId === review.user?.id && (
								<ReviewActions recipe={recipe} review={review} />
							)}
						</div>
					</li>
				)
			})}
		</ul>
	)
}
