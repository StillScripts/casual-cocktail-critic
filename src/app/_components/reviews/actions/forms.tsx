/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { type Review } from '@/app/_components/reviews/types'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { Textarea } from '@/components/ui/textarea'
import { UploadButton } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

const reviewFormSchema = z.object({
	feedback: z.string().min(2, {
		message: 'Feedback is required'
	}),
	rating: z.coerce
		.number()
		.gte(1, { message: 'The rating must be between 1 and 10' })
		.lte(10, { message: 'The rating must be between 1 and 10' }),
	image: z.string().optional()
})

type ReviewFormValues = z.infer<typeof reviewFormSchema>

export const CreateReviewForm = ({
	close,
	recipeId
}: {
	close: () => void
	recipeId: number
}) => {
	const router = useRouter()
	const createReviews = api.review.create.useMutation()
	const form = useForm<ReviewFormValues>({
		resolver: zodResolver(reviewFormSchema)
	})

	function onSubmit(data: ReviewFormValues) {
		createReviews.mutate({
			feedback: data.feedback,
			rating: parseFloat(`${data.rating}`),
			image: data.image,
			recipeId
		})
	}

	useEffect(() => {
		if (createReviews?.isSuccess) {
			close()
			router.refresh()
		}
	}, [close, createReviews?.isSuccess, router])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="feedback"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback</FormLabel>
							<FormControl>
								<Textarea placeholder="Your feedback" {...field} />
							</FormControl>
							<FormDescription>
								Describe your experience of the cocktail and explain your rating
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rating</FormLabel>
							<FormControl>
								<Input placeholder="Your rating" type="number" {...field} />
							</FormControl>
							<FormDescription>
								Give the cocktail a rating out of 10
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<Input className="hidden" {...field} value={field.value ?? ''} />
					)}
				/>
				<div className="rounded-xl p-4 shadow">
					<div>
						<p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Upload an image
						</p>
						<div className={cn(form.watch('image') ? 'py-2' : 'hidden')}>
							<img
								className="h-auto w-8"
								src={form.watch('image')}
								alt="your image"
							/>
						</div>
					</div>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={res => {
							form.setValue('image', res[0]?.url ?? '')
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`)
						}}
					/>
				</div>
				<SubmitButton loading={createReviews.isLoading}>
					Add Your Rating
				</SubmitButton>
			</form>
		</Form>
	)
}

export const UpdateReviewForm = ({
	close,
	review
}: {
	close: () => void
	review: Review
}) => {
	const router = useRouter()
	const updateReviews = api.review.update.useMutation()
	const form = useForm<ReviewFormValues>({
		resolver: zodResolver(reviewFormSchema),
		defaultValues: {
			feedback: review?.feedback ?? '',
			rating: review?.rating ?? undefined,
			image: review?.image ?? ''
		}
	})

	function onSubmit(data: ReviewFormValues) {
		updateReviews.mutate({
			feedback: data.feedback,
			rating: parseFloat(`${data.rating}`),
			image: data.image,
			id: review.id!
		})
	}

	useEffect(() => {
		if (updateReviews?.isSuccess) {
			close()
			router.refresh()
		}
	}, [close, updateReviews?.isSuccess, router])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="feedback"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback</FormLabel>
							<FormControl>
								<Textarea placeholder="Your feedback" {...field} />
							</FormControl>
							<FormDescription>
								Describe your experience of the cocktail and explain your rating
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rating</FormLabel>
							<FormControl>
								<Input placeholder="Your rating" type="number" {...field} />
							</FormControl>
							<FormDescription>
								Give the cocktail a rating out of 10
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="rounded-xl p-4 shadow">
					<div>
						<p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Upload an image
						</p>
						<div className={cn(form.watch('image') ? 'py-2' : 'hidden')}>
							<img
								className="h-auto w-8"
								src={form.watch('image')}
								alt="your image"
							/>
						</div>
					</div>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={res => {
							form.setValue('image', res[0]?.url ?? '')
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`)
						}}
					/>
				</div>
				<SubmitButton loading={updateReviews.isLoading}>
					Update Your Rating
				</SubmitButton>
			</form>
		</Form>
	)
}
