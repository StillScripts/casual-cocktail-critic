import { type AdapterAccount } from 'next-auth/adapters'

import { relations, sql } from 'drizzle-orm'
import {
	bigint,
	float,
	index,
	int,
	mysqlTableCreator,
	primaryKey,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/mysql-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
	name => `casual-cocktail-critic_${name}`
)

export const recipes = mysqlTable(
	'recipe',
	{
		id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
		name: varchar('name', { length: 256 }),
		description: text('description'),
		instructions: text('instructions'),
		createdById: varchar('createdById', { length: 255 }).notNull(),
		createdAt: timestamp('created_at')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updatedAt').onUpdateNow()
	},
	example => ({
		createdByIdIdx: index('createdById_idx').on(example.createdById),
		nameIndex: index('name_idx').on(example.name)
	})
)

export const recipeIngredients = mysqlTable(
	'recipe_ingredient',
	{
		id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
		name: varchar('name', { length: 256 }),
		quantity: varchar('quantity', { length: 100 }),
		recipeId: int('recipeId').notNull()
	},
	example => ({
		recipeIndex: index('recipe_idx').on(example.recipeId)
	})
)

export const recipeReviews = mysqlTable(
	'recipe_review',
	{
		id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
		feedback: text('feedback'),
		rating: float('rating'),
		image: text('image'),
		recipeId: int('recipeId').notNull(),
		createdById: varchar('createdById', { length: 255 }).notNull()
	},
	example => ({
		createdByIdIdx: index('createdById_idx').on(example.createdById),
		recipeIndex: index('recipe_idx').on(example.recipeId)
	})
)

export const recipeRelations = relations(recipes, ({ many, one }) => ({
	recipeIngredients: many(recipeIngredients),
	recipeReviews: many(recipeReviews),
	user: one(users, {
		fields: [recipes.createdById],
		references: [users.id]
	})
}))

export const recipeIngredientsRelations = relations(
	recipeIngredients,
	({ one }) => ({
		recipes: one(recipes, {
			fields: [recipeIngredients.recipeId],
			references: [recipes.id]
		})
	})
)

export const recipeReviewsRelations = relations(recipeReviews, ({ one }) => ({
	recipes: one(recipes, {
		fields: [recipeReviews.recipeId],
		references: [recipes.id]
	}),
	user: one(users, {
		fields: [recipeReviews.createdById],
		references: [users.id]
	})
}))

// Unused
export const ingredients = mysqlTable(
	'ingredient',
	{
		id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
		name: varchar('name', { length: 256 })
	},
	example => ({
		nameIndex: index('name_idx').on(example.name)
	})
)

export const users = mysqlTable('user', {
	id: varchar('id', { length: 255 }).notNull().primaryKey(),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull(),
	emailVerified: timestamp('emailVerified', {
		mode: 'date',
		fsp: 3
	}).default(sql`CURRENT_TIMESTAMP(3)`),
	image: varchar('image', { length: 255 })
})

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	recipes: many(recipes),
	recipeReviews: many(recipeReviews)
}))

export const accounts = mysqlTable(
	'account',
	{
		userId: varchar('userId', { length: 255 }).notNull(),
		type: varchar('type', { length: 255 })
			.$type<AdapterAccount['type']>()
			.notNull(),
		provider: varchar('provider', { length: 255 }).notNull(),
		providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: int('expires_at'),
		token_type: varchar('token_type', { length: 255 }),
		scope: varchar('scope', { length: 255 }),
		id_token: text('id_token'),
		session_state: varchar('session_state', { length: 255 })
	},
	account => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
		userIdIdx: index('userId_idx').on(account.userId)
	})
)

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const sessions = mysqlTable(
	'session',
	{
		sessionToken: varchar('sessionToken', { length: 255 })
			.notNull()
			.primaryKey(),
		userId: varchar('userId', { length: 255 }).notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	session => ({
		userIdIdx: index('userId_idx').on(session.userId)
	})
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export const verificationTokens = mysqlTable(
	'verificationToken',
	{
		identifier: varchar('identifier', { length: 255 }).notNull(),
		token: varchar('token', { length: 255 }).notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	vt => ({
		compoundKey: primaryKey(vt.identifier, vt.token)
	})
)
