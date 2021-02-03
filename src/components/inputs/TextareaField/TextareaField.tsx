import React from 'react'
import cn from 'classnames'
import styles from './TextareaField.module.scss'

interface P {
  label: string
  name: string
  value: string,
  maxLength?: number
  require?: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextareaField: React.FC<P> = (
  {label, name, value, require, onChange}
) => {
  return (
    <div className={styles.wrapper}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={cn(styles.textarea, 'textAreaField')}
        rows={4} />
      <label 
        className={styles.label}
        title={require ? "Поле обязательно к заполнению" : ''}
      >
        {label}
        {require && ' *'}
      </label>
    </div>
  )
}

export default TextareaField
