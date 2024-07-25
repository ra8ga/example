import React, { FC } from 'react'
import cx from 'classnames'
// ICONS
import { Music, Music2, Music3 } from 'lucide-react'
// STYLES
import styles from './styles.module.scss'

export const Spinner: FC<{
  additionalStyles?: string
  sizeMedium?: boolean
  sizeLg?: boolean
  testid?: string
}> = ({ additionalStyles, sizeMedium, sizeLg, testid = 'ui-spinner' }) => (
  <div
    data-testid={testid}
    className={cx(styles.spinnerComponent, additionalStyles, {
      [styles.theme]: true,
      [styles.sizeLg]: sizeLg,
      [styles.sizeMedium]: sizeMedium
    })}>
      <i><Music strokeWidth={2.5} size={30} /></i>
      <i><Music2 strokeWidth={2.5} size={30} /></i>
      <i><Music3 strokeWidth={2.5} size={30} /></i>
      <div /> {/* div for core animation */}
  </div>
)
export const SpinnerFullWidthHeight: FC<{
  additionalStyles?: string
  testid?: string
}> = ({ additionalStyles, testid = 'ui-spinner' }) => (
  <div className={cx(styles.spinnerFullWidthHeight, additionalStyles)}>
    <Spinner />
  </div>
)
