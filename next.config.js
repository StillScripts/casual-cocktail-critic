/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import('./src/env.mjs')

const withPWA = require('@ducanh2912/next-pwa').default({
	dest: 'public',
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	swcMinify: true,
	disable: process.env.NODE_ENV === 'development',
	workboxOptions: {
		disableDevLogs: true
	}
})

/** @type {import("next").NextConfig} */
const config = {
	images: {
		domains: ['cdn.discordapp.com', 'utfs.io']
	}
}

module.exports = withPWA(config)
