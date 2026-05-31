import type { NextConfig } from 'next'

const config: NextConfig = {
  serverExternalPackages: [
    '@langchain/langgraph',
    '@langchain/openai',
    '@langchain/core',
    '@electric-sql/pglite',
  ],
}

export default config
