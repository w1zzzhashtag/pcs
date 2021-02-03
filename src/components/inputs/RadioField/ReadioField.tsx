import React from 'react'
import cn from 'classnames'
import styles from './RadioField.module.scss'

interface P {
  name: string
  value: string
  label: string
  checked: boolean
  onChange: () => void
  className?: string
}

const RadioField:React.FC<P> = ({name, value, label, checked, onChange, className='w100'}) => {
  return (
    <div className={cn(styles.wrapper, {
      [styles.w50]: className === 'w50',
    })}>
      <input 
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.input} />
      <label htmlFor={value}>
        {label}
      </label>
    </div>
  )
}

export default RadioField
