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

export const DeleteReview = ({ id }: { id: number }) => {
	const router = useRouter()
	const deleteReview = api.review.delete.useMutation()

	useEffect(() => {
		if (deleteReview?.isSuccess) {
			toast({
				title: 'Succesful deletion',
				description: 'Your review was successfully deleted'
			})
			router.refresh()
		}
	}, [deleteReview?.isSuccess, router])
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className="text-red-600 hover:text-red-700"
					variant="ghost"
					size="sm"
				>
					<Cross2Icon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will delete this review.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => deleteReview.mutate({ id })}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
