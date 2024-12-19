'use client'

import { useState } from 'react'
import Header from './components/Header'
import FileUpload from './components/FileUpload'
import CustomizationSettings from './components/CustomizationSettings'
import ButtonGroup from './components/ButtonGroup'
import Footer from './components/Footer'

export default function Home() {
  const [keywords, setKeywords] = useState<string[]>([])
  const [customSuffixes, setCustomSuffixes] = useState<string[]>([
    '--v 6.1 --ar 16:9',
    '--v 6.1 --ar 16:9 --c 50',
    '--v 6.1 --ar 3:2',
    '--v 6.1 --ar 3:2 --c 50'
  ])
  const [additionalSuffixes, setAdditionalSuffixes] = useState<string[]>([
    'hyperrealistic, commercial angle shoot',
    'realistic, Shoot with Sony A7 IV'
  ])
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([])
  const [useImaginePrefix, setUseImaginePrefix] = useState(false)
  const [useBrackets, setUseBrackets] = useState(false)

  const handleKeywordsUploaded = (uploadedKeywords: string[]) => {
    const cleanedKeywords = uploadedKeywords
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0)
    setKeywords(cleanedKeywords)
  }

  const handleCustomSuffixesChange = (newSuffixes: string[]) => {
    setCustomSuffixes(newSuffixes)
  }

  const handleAdditionalSuffixesChange = (newSuffixes: string[]) => {
    setAdditionalSuffixes(newSuffixes)
  }

  const handlePromptsGenerated = (newPrompts: string[]) => {
    const finalPrompts = newPrompts.map(prompt => 
      useImaginePrefix ? `/imagine: ${prompt}` : prompt
    )
    setGeneratedPrompts(finalPrompts)
  }

  return (
    <div className="min-h-screen">
      <main className="p-8">
        <Header />
        <div className="max-w-4xl mx-auto space-y-8">
          <FileUpload onKeywordsUploaded={handleKeywordsUploaded} />
          <CustomizationSettings 
            customSuffixes={customSuffixes}
            additionalSuffixes={additionalSuffixes}
            onCustomSuffixesChange={handleCustomSuffixesChange}
            onAdditionalSuffixesChange={handleAdditionalSuffixesChange}
            useImaginePrefix={useImaginePrefix}
            onUsePrefixChange={setUseImaginePrefix}
            useBrackets={useBrackets}
            onUseBracketsChange={setUseBrackets}
          />
          <ButtonGroup 
            keywords={keywords}
            customSuffixes={customSuffixes}
            additionalSuffixes={additionalSuffixes}
            onPromptsGenerated={handlePromptsGenerated}
            generatedPrompts={generatedPrompts}
            useBrackets={useBrackets}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

