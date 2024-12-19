import './globals.css'
import { Inter } from 'next/font/google'
import ParticleBackground from './components/ParticleBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prompt Builder for Midjourney',
  description: 'Generate your Midjourney prompts with ease and customization!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a1a1a] text-white min-h-screen`}>
        <ParticleBackground />
        {children}
      </body>
    </html>
  )
}

