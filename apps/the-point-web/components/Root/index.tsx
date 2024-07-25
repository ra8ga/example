'use client'

import React, { ReactNode } from 'react'
// UI
import { OfflineInfo } from '@apprepo/ui-web/OfflineInfo'

export const Root = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <>
      <OfflineInfo />
      { children }
    </>
  )
}
