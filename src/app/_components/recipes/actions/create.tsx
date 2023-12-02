'use client'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

import { CreateRecipeForm } from './create-form'

export const AddNewRecipe = () => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add New Cocktail Recipe</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>New Cocktail</DialogTitle>
				<CreateRecipeForm close={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
