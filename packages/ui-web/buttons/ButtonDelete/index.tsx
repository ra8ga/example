'use client'

import React, { FC } from 'react'
// UI
import { ArrowBigLeft } from 'lucide-react'
import { Button3d } from '../../buttons/Button3d'
import { Button } from '../Button'
// STYLES
import styles from './styles.module.scss'

export const ButtonDelete: FC<{
  confirm: any // @todo
}> = ({ confirm }) => {
  return (
    <Button3d
      additionalStyles={styles.btn}
      renderOne={
        <Button additionalStyles={styles.btn}>
          <i>
            <ArrowBigLeft theme='outline' />
          </i>
          DELETE
        </Button>
      }
      renderTwo={reset => <>
        <Button additionalStyles={styles.btn} onClick={() => confirm()}>
          <i><ArrowBigLeft /></i>{' '}YES
        </Button>
        <Button additionalStyles={styles.btn} onClick={() => reset.reset()}>
          <i><ArrowBigLeft /></i>{' '}Nah
        </Button>
        </>
      }
      renderThree={<Button additionalStyles={styles.btn}>Removed!</Button>}
    />
  )
}
