'use client'

import React, { ReactNode, forwardRef, MouseEvent, RefObject } from 'react'

export type Props = {
  additionalStyles?: string
  children?: ReactNode
  disabled?: boolean
  form?: string
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => unknown
  onTouchStart?: any // @todo
  testid?: string
  ref?: RefObject<HTMLElement>
  style?: { [key: string]: string; }
  title?: string
  type?: 'button' | 'submit' | 'reset'
}

// https://stackoverflow.com/questions/55620562/eslint-component-definition-is-missing-displayname-react-display-name
// eslint-disable-next-line react/display-name
export const Button = forwardRef(
  (props: Props, ref?: React.Ref<HTMLButtonElement>) => {
    const { additionalStyles, children, disabled, form, onClick, onTouchStart, testid = 'ui-button', style, title, type = 'button' } = props

    return (
      <button
        ref={ref}
        className={additionalStyles}
        form={form}
        data-testid={testid}
        disabled={disabled}
        onClick={onClick}
        onTouchStart={onTouchStart}
        style={style}
        title={title}
        type={type}>
        {children}
      </button>
    )
  }
)
