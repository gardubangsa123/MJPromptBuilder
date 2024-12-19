'use client'

import { useState } from 'react'

interface ButtonGroupProps {
  keywords: string[];
  customSuffixes: string[];
  additionalSuffixes: string[];
  onPromptsGenerated: (prompts: string[]) => void;
  generatedPrompts: string[];
  useBrackets: boolean;
}

export default function ButtonGroup({ 
  keywords, 
  customSuffixes, 
  additionalSuffixes, 
  onPromptsGenerated,
  generatedPrompts,
  useBrackets
}: ButtonGroupProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const generatePrompts = () => {
    setIsGenerating(true)
    try {
      const prompts = keywords.map(keyword => {
        const customSuffix = customSuffixes[Math.floor(Math.random() * customSuffixes.length)];
        const additionalSuffix = additionalSuffixes[Math.floor(Math.random() * additionalSuffixes.length)];
        
        // Format the prompt in a single line
        const formattedKeyword = useBrackets ? `[${keyword.trim()}]` : keyword.trim();
        const formattedPrompt = [
          formattedKeyword,
          additionalSuffix && `, ${additionalSuffix.trim()}`,
          customSuffix.trim()
        ]
          .filter(Boolean)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        return formattedPrompt;
      });
      onPromptsGenerated(prompts);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }

  const handleDownload = () => {
    setIsDownloading(true)
    try {
      const element = document.createElement("a")
      // Join with \n to ensure one prompt per line
      const fileContent = generatedPrompts.join('\n')
      const file = new Blob([fileContent], {type: 'text/plain'})
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
    <section className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 transition-all hover:border-[#00ffd5]/30">
      <div className="flex flex-row justify-center gap-4">
        <button
          onClick={generatePrompts}
          className="flex-1 max-w-[200px] bg-[#00ffd5] text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#00ffd5]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover-glow"
          disabled={keywords.length === 0 || isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Prompts'}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 max-w-[200px] bg-[#00ffd5] text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#00ffd5]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover-glow"
          disabled={generatedPrompts.length === 0 || isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download Result'}
        </button>
      </div>
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

