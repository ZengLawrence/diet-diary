import type { Metadata } from 'next'
import '../index.css'

export const metadata: Metadata = {
  title: 'Diet Diary',
  description: 'Keeping records of food you eat for the day.',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}