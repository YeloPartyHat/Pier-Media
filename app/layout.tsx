import AppProviders from '@/components/core/AppProviders'

export const metadata = {
	title: 'Next.js',
	description: 'Generated by Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	)
}
