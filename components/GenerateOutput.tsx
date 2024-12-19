'use client'

import { useState } from 'react'

interface GenerateOutputProps {
  keywords: string[];
  customSuffixes: string[];
  additionalSuffixes: string[];
  onPromptsGenerated: (prompts: string[]) => void;
}

export default function GenerateOutput({ keywords, customSuffixes, additionalSuffixes, onPromptsGenerated }: GenerateOutputProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePrompts = () => {
    setIsGenerating(true)
    const prompts = keywords.map(keyword => {
      const customSuffix = customSuffixes[Math.floor(Math.random() * customSuffixes.length)];
      const additionalSuffix = additionalSuffixes[Math.floor(Math.random() * additionalSuffixes.length)];
      return `${keyword}${additionalSuffix ? `, ${additionalSuffix}` : ''} ${customSuffix}`.trim();
    });
    onPromptsGenerated(prompts);
    setIsGenerating(false)
  }

  return (
    <section className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Generate Output</h2>
      <button
        onClick={generatePrompts}
        className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={keywords.length === 0 || isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate Prompts'}
      </button>
    </section>
  )
}

