import Image from 'next/image'

import { StarFilledIcon } from '@radix-ui/react-icons'

import type { RouterOutput } from '@/server/api/root'

type Reviews = RouterOutput['recipe']['getWithReviews'][number]['recipeReviews']

export const Reviews = ({ reviews }: { reviews: Reviews }) => {
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
						<div className="max-w-xl flex-auto">
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
						</div>
					</li>
				)
			})}
		</ul>
	)
}
