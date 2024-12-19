'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'

interface CustomizationSettingsProps {
  customSuffixes: string[];
  additionalSuffixes: string[];
  onCustomSuffixesChange: (suffixes: string[]) => void;
  onAdditionalSuffixesChange: (suffixes: string[]) => void;
  useImaginePrefix: boolean;
  onUsePrefixChange: (value: boolean) => void;
  useBrackets: boolean;
  onUseBracketsChange: (value: boolean) => void;
}

export default function CustomizationSettings({
  customSuffixes,
  additionalSuffixes,
  onCustomSuffixesChange,
  onAdditionalSuffixesChange,
  useImaginePrefix,
  onUsePrefixChange,
  useBrackets,
  onUseBracketsChange
}: CustomizationSettingsProps) {
  const [localCustomSuffixes, setLocalCustomSuffixes] = useState<string[]>(customSuffixes)
  const [localAdditionalSuffixes, setLocalAdditionalSuffixes] = useState<string[]>(additionalSuffixes)

  useEffect(() => {
    onCustomSuffixesChange(localCustomSuffixes)
  }, [localCustomSuffixes, onCustomSuffixesChange])

  useEffect(() => {
    onAdditionalSuffixesChange(localAdditionalSuffixes)
  }, [localAdditionalSuffixes, onAdditionalSuffixesChange])

  const addSuffix = (type: 'custom' | 'additional') => {
    if (type === 'custom') {
      setLocalCustomSuffixes([...localCustomSuffixes, ''])
    } else {
      setLocalAdditionalSuffixes([...localAdditionalSuffixes, ''])
    }
  }

  const updateSuffix = (type: 'custom' | 'additional', index: number, value: string) => {
    if (type === 'custom') {
      const newSuffixes = [...localCustomSuffixes]
      newSuffixes[index] = value
      setLocalCustomSuffixes(newSuffixes)
    } else {
      const newSuffixes = [...localAdditionalSuffixes]
      newSuffixes[index] = value
      setLocalAdditionalSuffixes(newSuffixes)
    }
  }

  const deleteSuffix = (type: 'custom' | 'additional', index: number) => {
    if (type === 'custom') {
      const newSuffixes = localCustomSuffixes.filter((_, i) => i !== index)
      setLocalCustomSuffixes(newSuffixes)
    } else {
      const newSuffixes = localAdditionalSuffixes.filter((_, i) => i !== index)
      setLocalAdditionalSuffixes(newSuffixes)
    }
  }

  return (
    <section className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 transition-all hover:border-[#00ffd5]/30">
      <h2 className="text-2xl font-semibold mb-4 text-[#00ffd5]">Customization Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox 
            id="imagine-prefix" 
            checked={useImaginePrefix}
            onCheckedChange={(checked) => onUsePrefixChange(checked as boolean)}
            className="border-[#00ffd5] data-[state=checked]:bg-[#00ffd5] data-[state=checked]:text-gray-900"
          />
          <Label htmlFor="imagine-prefix" className="text-sm text-gray-200">
            Add "/imagine: " prefix to prompts
          </Label>
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox 
            id="use-brackets" 
            checked={useBrackets}
            onCheckedChange={(checked) => onUseBracketsChange(checked as boolean)}
            className="border-[#00ffd5] data-[state=checked]:bg-[#00ffd5] data-[state=checked]:text-gray-900"
          />
          <Label htmlFor="use-brackets" className="text-sm text-gray-200">
            Add "[ keyword ]"
          </Label>
        </div>
        <div>
          <h3 className="text-xl mb-2 text-gray-200">Custom Suffix</h3>
          {localCustomSuffixes.map((suffix, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={suffix}
                onChange={(e) => updateSuffix('custom', index, e.target.value)}
                placeholder="--v 5 --ar 16:9"
                className="flex-grow bg-gray-700/50 text-white p-2 rounded-l border border-gray-600 focus:border-[#00ffd5] outline-none"
              />
              <button
                onClick={() => deleteSuffix('custom', index)}
                className="bg-red-500 text-white p-2 rounded-r hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addSuffix('custom')}
            className="mt-2 bg-[#00ffd5] text-gray-900 p-2 rounded hover:bg-[#00ffd5]/80 transition-colors"
          >
            + Add Custom Suffix
          </button>
          <p className="text-sm text-gray-400 mt-2">Multiple suffixes will be applied randomly</p>
        </div>
        <div>
          <h3 className="text-xl mb-2 text-gray-200">Additional Suffix</h3>
          {localAdditionalSuffixes.map((suffix, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={suffix}
                onChange={(e) => updateSuffix('additional', index, e.target.value)}
                placeholder="e.g., hyperrealistic, commercial angle shoot"
                className="flex-grow bg-gray-700/50 text-white p-2 rounded-l border border-gray-600 focus:border-[#00ffd5] outline-none"
              />
              <button
                onClick={() => deleteSuffix('additional', index)}
                className="bg-red-500 text-white p-2 rounded-r hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addSuffix('additional')}
            className="mt-2 bg-[#00ffd5] text-gray-900 p-2 rounded hover:bg-[#00ffd5]/80 transition-colors"
          >
            + Add Additional Suffix
          </button>
        </div>
      </div>
    </section>
  )
}

