import './globals.css'

export const metadata = {
  title: 'Tools for UMA',
  description: 'Making life easier for UMAns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
