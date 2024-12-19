'use client'

import { useState } from 'react'

interface DownloadOptionsProps {
  generatedPrompts: string[];
}

export default function DownloadOptions({ generatedPrompts }: DownloadOptionsProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleDownload = () => {
    setIsDownloading(true)
    try {
      const element = document.createElement("a")
      const file = new Blob([generatedPrompts.join('\n')], {type: 'text/plain'})
      element.href = URL.createObjectURL(file)
      element.download = "generated_prompts.txt"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      setDownloadStatus('success')
    } catch (error) {
      console.error('Download failed:', error)
      setDownloadStatus('error')
    } finally {
      setIsDownloading(false)
      setTimeout(() => setDownloadStatus('idle'), 3000)
    }
  }

  return (
    <section className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Download Options</h2>
      <button
        onClick={handleDownload}
        className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={generatedPrompts.length === 0 || isDownloading}
      >
        {isDownloading ? 'Downloading...' : 'Download Result (.txt)'}
      </button>
      {downloadStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-lg animate-fade-in-out">
          File downloaded successfully!
        </div>
      )}
      {downloadStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-lg animate-fade-in-out">
          Download failed. Please try again.
        </div>
      )}
    </section>
  )
}

