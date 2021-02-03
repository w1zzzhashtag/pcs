import React from 'react'
import cn from 'classnames'
import styles from './NumberField.module.scss'

interface P {
  value: number
  name: string
  step?: number
  label: string
  className?: 'w48'
  require?: boolean
  price?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const NumberField:React.FC<P> = ({
  value, name, step, require, price, label, className, onChange
}) => {  
  return (
    <div className={cn(styles.wrapper, {
      [styles.w48]: className === 'w48'
    })}>
      <input 
        type="number"
        name={name}
        value={value}
        step={step ? step : 1}
        onChange={onChange}
        className={cn(styles.input, 'numberField', {
          [styles.price] : price
        })} />

      <label 
        className={styles.label}
        title={require ? "Поле обязательно к заполнению" : ''}
      >
        {label}
        {require && ' *'}
      </label>

      {price && <span className={styles.priceLabel}>руб.</span>}
    </div>
  )
}

export default NumberField