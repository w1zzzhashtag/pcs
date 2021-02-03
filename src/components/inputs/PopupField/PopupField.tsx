import React from 'react'
import cn from 'classnames'
import styles from './PopupField.module.scss'

interface P {
  label: string
  value: string | null  | undefined
  handleOpen: (val: boolean) => void
  removeValue: () => void
  require?: boolean
}

const PopupField: React.FC<P> = (
  { label, value, handleOpen, removeValue, require }
) => {
  return (
    <div className={styles.wrapper}>
      <label 
        className={styles.label}
        title={require ? 'Поле обязательно к заполнению' : ''}
      >
        {label} {require && '*'}
      </label>

      {value ? (
        <div className={styles.selectedItem}>
          <span
            onClick={() => handleOpen(true)}
            className={cn(styles.text, 'popupField')}
            title={value}
          >
            {value.length > 20 ? value.substr(0, 50) + '...' : value}
          </span>
          <span
            className={styles.selectedItem__delete}
            onClick={removeValue}
          >&times;</span>
        </div>
      ) : <span
            onClick={() => handleOpen(true)}
            className={cn(styles.text, 'popupField')}
          >Выбрать</span>
      }
    </div>
  )
}

export default PopupField
