import React from 'react'
import cn from 'classnames'
import { FieldError } from 'react-hook-form'
import styles from './../RegistrationPG.module.scss'

interface P {
  label: string
  name: string
  register: () => void
  error?: FieldError
  type?: string
}

const Input: React.FC<P> = ({ label, name, register, error, type = 'text' }) => {
  return (
    <div className={styles.input_wrapper}>
      {error && <span className={styles.input__error}>{error.message}</span>}
      <input
        type={type}
        name={name}
        className={cn(styles.input, 'textField')}
        ref={register} />
      <label className={styles.input__title}>{label}</label>
    </div>
  )
}

export default Input
