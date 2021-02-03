import React from 'react'
import { FieldError } from 'react-hook-form'
import styles from './../RegistrationPG.module.scss'

interface P {
  label: string
  name: string
  register: () => void
}

const Checkbox: React.FC<P> = ({ label, name, register }) => {
  return (
    <div className={styles.checkbox_wrapper}>
      <input
        type="checkbox"
        name={name}
        id={name}
        className={styles.checkbox}
        ref={register} />
      <label
        htmlFor={name}
        className={styles.checkbox__title}>{label}</label>
    </div>
  )
}

export default Checkbox
