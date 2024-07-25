'use client'

import React, { ElementType, FC, ReactNode, useState } from 'react'
import cx from 'classnames'
// UI
// import { Picture } from 'Picture'
// import { Tag } from '../Tag'
// STYLES
import styles from './styles.module.scss'

export enum sides {
  front,
  bottom,
  top,
  back,
}

export const Button3d: FC<{
  additionalStyles?: string
  renderOne: ReactNode
  renderTwo: ReactNode
  renderThree?: ReactNode
  renderFour?: ReactNode
  showSide?: sides.front | sides.bottom | sides.top | sides.back
  testid?: string
}> = ({ additionalStyles, renderOne, renderTwo, renderThree, renderFour, showSide, testid = 'ui-button-rotating' }) => {
  const [activeSide, setActiveSide] = useState(sides.front)
  const reset = () => setActiveSide(sides.front)
  const RenderOneComponent = renderOne as ElementType
  const RenderTwoComponent = renderTwo as ElementType
  const RenderThreeComponent = renderThree as ElementType
  const RenderFourComponent = renderFour as ElementType

  return (
    <div 
      className={cx(styles.cube, additionalStyles, {
        [styles.isFrontActive]: activeSide === sides.front,
        [styles.isBottomActive]: activeSide === sides.bottom,
        [styles.isTopActive]: activeSide === sides.top,
        [styles.isBackActive]: activeSide === sides.back,
      })}
      data-testid={testid}>
      { renderOne &&
        <div className={styles.front} onClick={() => !showSide && typeof(renderOne) !== 'function' && setActiveSide(sides.bottom)}>
          {typeof(renderOne) === 'function' ? <RenderOneComponent reset={ reset } /> : renderOne}
        </div>
      }
      { renderTwo &&
        <div className={styles.bottom} onClick={() => !showSide && typeof(renderTwo) !== 'function' && setActiveSide(sides.top)}>
          {typeof(renderTwo) === 'function' ? <RenderTwoComponent reset={ reset } /> : renderTwo}
        </div>
      }
      { renderThree &&
        <div className={styles.top} onClick={() => {
          if (!showSide && typeof(renderThree) !== 'function') {
            if (renderFour) {
              setActiveSide(sides.back)
            } else {
              setActiveSide(sides.front)
            }
          }
        }}>
          {typeof(renderThree) === 'function' ? <RenderThreeComponent reset={ reset } /> : renderThree}
        </div>
      }
      { renderFour &&
        <div className={styles.back} onClick={() => !showSide && typeof(renderFour) !== 'function' && setActiveSide(sides.front)}>
          <div className={styles.invertedBack}>
            {typeof(renderFour) === 'function' ? <RenderFourComponent reset={ reset } /> : renderFour}
          </div>
        </div>
      }
    </div>
  )
}
