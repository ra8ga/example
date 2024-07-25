
'use client'

export const runtime = 'edge'

import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {  
  return (
    <>
      {children}
    </>
  )
}
