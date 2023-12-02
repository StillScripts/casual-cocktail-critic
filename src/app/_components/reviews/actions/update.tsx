'use client'
import { useState } from 'react'

import { Pencil2Icon } from '@radix-ui/react-icons'

import { type Review } from '@/app/_components/reviews/types'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

import { UpdateReviewForm } from './forms'

export interface Recipe {
	name: string | null
	id: number
	description: string | null
	instructions: string | null
	createdById: string
	createdAt: Date
	updatedAt: Date | null
}

export const UpdateReview = ({
	recipe,
	review
}: {
	recipe: Recipe
	review: Review
}) => {
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="pl-0 text-green-700 hover:text-green-800"
					variant="ghost"
					size="sm"
				>
					<Pencil2Icon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Cocktail Rating</DialogTitle>
				<DialogDescription>
					Edit your rating and feedback for the {recipe.name} cocktail.
				</DialogDescription>
				<UpdateReviewForm close={() => setOpen(false)} review={review} />
			</DialogContent>
		</Dialog>
	)
}
