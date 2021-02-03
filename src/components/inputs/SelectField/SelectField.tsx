import React from 'react'
import cn from 'classnames'
import styles from './SelectField.module.scss'

interface P {
  label: string
  value: string
  name: string
  children: React.ReactNode
  className?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectField: React.FC<P> = ({
  label, value, name, children, onChange, className
}) => {  
  return (
    <div className={cn(styles.wrapper, {
      [styles.w48]: className === 'w48',
      [styles.w30]: className === 'w30',
    })}>
      <select
        value={value}
        name={name}
        onChange={onChange}
        className={cn(styles.select, 'selectField')}
      >
        {children}
      </select>
      <label className={styles.label}>{label}</label>
    </div>
  )
}

export default SelectField
