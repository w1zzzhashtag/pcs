import React from 'react'
import cn from 'classnames'
import styles from './CheckboxField.module.scss'

interface P {
  name: string
  checked: boolean
  label: string
  className?: 'w30' | 'w100'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckboxField: React.FC<P> = ({
  name, checked, onChange, label, className
}) => {  
  return (
    <div className={cn(styles.wrapper, {
      [styles.w30]: className === 'w30',
      [styles.w100]: className === 'w100'
    })}>
      <input
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className={styles.input} />
      <label
        htmlFor={name}
        className={styles.label}
      >{label}</label>
    </div>
  )
}

export default CheckboxField
