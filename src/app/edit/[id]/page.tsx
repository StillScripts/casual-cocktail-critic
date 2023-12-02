import { UpdateForm } from '@/app/_components/recipes/actions/update-form'
import { api } from '@/trpc/server'

export const dynamic = 'force-dynamic'

const EditRecipePage = async ({ params }: { params: { id: string } }) => {
	const recipes = await api.recipe.getSingle.query({ id: parseInt(params.id) })
	const recipe = recipes ? recipes[0] : null
	if (!recipe) {
		return <h2>Recipe Not Found</h2>
	}
	return (
		<div className="bg-muted">
			<div className="container min-h-screen py-16">
				<UpdateForm recipes={recipes} />
			</div>
		</div>
	)
}

export default EditRecipePage
