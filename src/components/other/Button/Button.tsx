import React from 'react'
import cn from 'classnames'
import { ThemeContext } from '../../../app/contexts'
import styles from './Button.module.scss'

interface P {
  type: 'submit' | 'button' | 'reset'
  className: 'green' | 'orange' | 'red' | 'white'
  width?: | 'w100'
  uppercase?: boolean
  rounded?: boolean
  bold?: boolean
  disabled?: boolean
  children: React.ReactNode
  handleClick?: (e: React.FormEvent) => void
}

const Button:React.FC<P> = (
  { type, className, width, uppercase, rounded, bold, disabled=false, children, handleClick}
) => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <button 
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={cn(styles.button, styles[theme], styles[className], {
        [styles.w100]: width === 'w100',
        [styles.uppercase] : uppercase,
        [styles.rounded] : rounded,
        [styles.bold]: bold,
      })}
    >
      {children}
    </button>
  )
}

export default Button
