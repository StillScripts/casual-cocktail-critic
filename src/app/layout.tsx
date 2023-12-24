import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'

import Header from '@/app/_components/header'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import { Toaster } from '@/components/ui/toaster'
import { TRPCReactProvider } from '@/trpc/react'

import '@/styles/globals.css'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans'
})

export const metadata: Metadata = {
	title: 'Casual Cocktail Critic',
	description: 'Store cocktail recipes and rate your experiences.',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
	manifest: '/manifest.json'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`font-sans ${inter.variable}`} suppressHydrationWarning>
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				<TRPCReactProvider cookies={cookies().toString()}>
					<Header />
					{children}
					<Toaster />
				</TRPCReactProvider>
			</body>
		</html>
	)
}
