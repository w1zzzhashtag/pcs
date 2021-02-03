import React from 'react'
import cn from 'classnames'
import styles from './../RegistrationPG.module.scss'

interface P {
  label: string
  name: string
  register: () => void
}

const Select: React.FC<P> = ({ label, name, register, children }) => {
  return (
    <div className={styles.select_wrapper}>
      <select
        name={name}
        ref={register}
        className={cn(styles.select, 'selectField')}
      >
        {children}
      </select>
      <label className={styles.select__title}>{label}</label>
    </div>
  )
}

export default Select
