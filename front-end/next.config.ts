import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['i.pravatar.cc'],
  },
}

export default nextConfig
