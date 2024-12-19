'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  onKeywordsUploaded: (keywords: string[]) => void;
}

export default function FileUpload({ onKeywordsUploaded }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [keywordCount, setKeywordCount] = useState(0)

  const onDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    setFile(uploadedFile)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const keywords = content.split('\n').filter(line => line.trim() !== '')
      setKeywordCount(keywords.length)
      onKeywordsUploaded(keywords)
    }
    reader.readAsText(uploadedFile)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'text/plain': ['.txt'] } })

  return (
    <section className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Keywords File (.txt)</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-yellow-500 rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragActive ? 'border-yellow-300 bg-gray-700' : ''
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-yellow-300">Drop the file here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop a file here, or click to select a file</p>
        )}
      </div>
      {file && (
        <div className="mt-4">
          <p>File uploaded: {file.name}</p>
          <p>Keywords found: {keywordCount}</p>
        </div>
      )}
    </section>
  )
}

