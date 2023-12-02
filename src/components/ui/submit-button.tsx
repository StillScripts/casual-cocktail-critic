'use client'
import { useFormState } from 'react-hook-form'

import { Button } from './button'
import { LoadingSpinner } from './icons'

export const SubmitButton = ({
	loading,
	children
}: {
	loading: boolean
	children: React.ReactNode
}) => {
	const { isDirty } = useFormState()
	return (
		<Button type="submit" disabled={!isDirty || loading}>
			{loading ? (
				<div className="flex items-end">
					<span className="mr-2">Saving...</span>
					<LoadingSpinner />
				</div>
			) : (
				children
			)}
		</Button>
	)
}
