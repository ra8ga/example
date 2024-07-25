'use client'

import React, { FC, useState } from 'react'
// @ts-ignore:next-line as didnt found types for this package
import useOnlineStatus from '@rehooks/online-status'
// UI
import { Button } from '../buttons/Button'
import { ArrowBigLeft } from 'lucide-react'
// STYLES
import styles from './styles.module.scss'

export const OfflineInfo:  FC<{
  testid?: string
}> = ({ testid = 'ui-offline-info' }) => {
  const [isClosed, setIsClosed] = useState<boolean>(false)
  const onlineStatus = useOnlineStatus()

  return (onlineStatus || isClosed) ? null : (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        body {
          padding-top: 42px;
        }
      `}} />
      <div className={styles.offlineInfo} data-testid={testid}>
        <i><ArrowBigLeft /></i>
        Oops you are not connected to the internet
        <Button additionalStyles={styles.btn} onClick={() => setIsClosed(true)}>
          <i className={styles.btnClose}>
            <ArrowBigLeft />
          </i>
        </Button>
      </div>
    </>
  )
}
