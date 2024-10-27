/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		removeConsole: process.env.NODE_ENV !== 'development',
	},
	experimental: {
		optimizeCss: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: "lh3.googleusercontent.com",
				protocol: "https",
			},
			{
				hostname: "avatars.githubusercontent.com",
				protocol: "https",
			},
		],
	},
	
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},

	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: '/app/:path*',
				has: [
					{
						type: 'host',
						value: 'app.localhost:3000',
					},
				],
			},
			{
				source: '/:path*',
				destination: '/website/:path*',
			},
		];
	},

	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, stale-while-revalidate=86400',
					},
				],
			},
		];
	},
};

export default nextConfig;
