import React from 'react'
import cn from 'classnames'
import styles from './TextField.module.scss'

interface P {
  type?: string,
  name: string,
  label: string,
  value: string,
  className?: 'w30' | 'w48' | 'w65' 
  maxLength?: number
  require?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<P> = ({
  type = 'text', name, label, onChange, value, className, maxLength, require
}) => {

  const [typeInput, setTypeInput] = React.useState<'text' | 'password'>('password')
  const handleTypeState = () => {
    setTypeInput(typeInput === 'password' ? 'text' : 'password')
  }

  return (
    <div className={cn(styles.wrapper, {
      [styles.w30]: className === 'w30',
      [styles.w48]: className === 'w48',
      [styles.w65]: className === 'w65',
    })}>
      <input
        type={type === 'password' ? typeInput : 'text'}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={cn(styles.input, 'textField')} />
      <label
        className={styles.label}
        title={require ? "Поле обязательно к заполнению" : ''}
      >
        {label}
        {require && ' *'}
      </label>
      
      {type === 'password' && (
        <button
          title="Показать парроль"
          type="button"
          onClick={handleTypeState}
          className={cn(styles.eyeBtn, {
            [styles.eyeBtn__opened]: typeInput === 'text'
          })}></button>
      )}
    </div>
  )
}

export default TextField
