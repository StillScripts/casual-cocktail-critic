import Link from 'next/link'

import { Reviews } from '@/app/_components/reviews/reviews'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { getServerAuthSession } from '@/server/auth'
import { api } from '@/trpc/server'

export const dynamic = 'force-dynamic'

const ViewRecipePage = async ({ params }: { params: { id: string } }) => {
	const session = await getServerAuthSession()

	const recipes = await api.recipe.getWithReviews.query({
		id: parseInt(params.id)
	})
	const recipe = recipes ? recipes[0] : null
	if (!recipe) {
		return <h2>Recipe Not Found</h2>
	}

	return (
		<div className="min-h-screen bg-muted">
			<div className="container py-8">
				<Card className="mx-auto max-w-2xl">
					<CardHeader>
						<CardTitle>{recipe?.name}</CardTitle>
						<CardDescription>{recipe?.description}</CardDescription>
					</CardHeader>
					<CardContent>
						{recipe?.recipeIngredients?.length > 0 && (
							<>
								<p className="font-medium">Ingredients:</p>
								<ul className="ml-4 list-decimal text-sm">
									{recipe?.recipeIngredients?.map(ingredient => (
										<li key={ingredient.id}>
											<span className="font-bold">{ingredient.name}</span>&nbsp;
											<span className="text-xs text-muted-foreground">
												({ingredient.quantity})
											</span>
										</li>
									))}
								</ul>
							</>
						)}
					</CardContent>
					{session?.user?.id === recipe.createdById && (
						<CardFooter>
							<Button asChild>
								<Link href={`/edit/${recipe.id}`}>Edit Recipe</Link>
							</Button>
						</CardFooter>
					)}
				</Card>
			</div>

			<div className="py-8">
				<div className="container">
					<h4 className="text-xl font-medium">Reviews</h4>
					<Reviews
						recipe={recipe}
						reviews={recipe.recipeReviews}
						userId={session?.user?.id ?? 'unauthorised'}
					/>
				</div>
			</div>
		</div>
	)
}

export default ViewRecipePage
