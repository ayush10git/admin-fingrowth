'use client'
import React from 'react'
import { ClerkProvider } from "@clerk/nextjs";

const ClerkProviderComp = ({children}) => {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}

export default ClerkProviderComp
