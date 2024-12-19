import { Coffee, Globe, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-transparent text-white py-12 px-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Us Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-yellow-400">Support Us</h3>
            </div>
            <div className="flex flex-col gap-3">
              <a 
                href="https://ko-fi.com/grafisify"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors font-medium"
              >
                <Coffee className="w-4 h-4" />
                Support on Ko-fi
              </a>
              <a 
                href="https://saweria.co/grafisify"
                className="inline-flex items-center justify-center gap-2 bg-[#4285f4] text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors font-medium"
              >
                <span className="w-4 h-4">💝</span>
                Donate on Saweria
              </a>
            </div>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-[#4285f4]" />
              <h3 className="text-xl font-semibold text-[#4285f4]">Resources</h3>
            </div>
            <div className="flex flex-col gap-2">
              <a 
                href="https://grafisify.com/"
                className="text-gray-300 hover:text-[#4285f4] transition-colors"
              >
                Blog
              </a>
              <a 
                href="https://grafisify.com/stockerbuddy"
                className="text-gray-300 hover:text-[#4285f4] transition-colors"
              >
                Stockerbuddy Tools
              </a>
            </div>
          </div>

          {/* Follow Us Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/grafisify"
                className="text-gray-300 hover:text-pink-500 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://fb.com/grafisify"
                className="text-gray-300 hover:text-[#4285f4] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          © 2024 Grafisify. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

