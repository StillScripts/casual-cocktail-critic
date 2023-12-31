'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Cross2Icon } from '@radix-ui/react-icons'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/trpc/react'

export const DeleteRecipe = ({
	id,
	belongsToUser
}: {
	id: number
	belongsToUser?: boolean
}) => {
	const router = useRouter()
	const deleteRecipe = api.recipe.delete.useMutation()

	useEffect(() => {
		if (deleteRecipe?.isSuccess) {
			toast({
				title: 'Succesful deletion',
				description: 'This cocktail recipe was successfully deleted'
			})
			router.refresh()
		}
	}, [deleteRecipe?.isSuccess, router])
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className="text-red-600 hover:text-red-700"
					variant="ghost"
					size="sm"
					disabled={!belongsToUser}
				>
					<Cross2Icon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will delete this cocktail recipe.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={!belongsToUser}
						onClick={() => deleteRecipe.mutate({ id })}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
