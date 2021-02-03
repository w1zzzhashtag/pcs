import React from 'react'
import cn from 'classnames'

import { ThemeContext } from '../../../app/contexts'
import { manufacturersValuesFormType } from './../manufacturerTypes'

import styles from './ManufactureSearchForm.module.scss'
import { Button } from '../../../components'

interface iProps {
  values: manufacturersValuesFormType
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

const ManufactureSearchForm: React.FC<iProps> = ({ values, handleChange, handleSubmit }) => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <form className={cn(styles.wrapper, styles[theme])} onSubmit={handleSubmit}>
      <div className={cn(styles.item, styles.item__name)}>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={cn(styles.input, 'textField')} />
        <label className={cn(styles.label, {
          [styles.label_active]: values.name !== ''
        })}>Наименование</label>
      </div>

      <div className={cn(styles.item, styles.item__inn)}>
        <input
          type="text"
          name="inn"
          value={values.inn}
          onChange={handleChange}
          className={cn(styles.input, 'textField')} />
        <label className={cn(styles.label, {
          [styles.label_active]: values.inn !== ''
        })}>ИНН</label>
      </div>

      <div className={cn(styles.item, styles.item__products)}>
        <input
          type="text"
          name="productName"
          value={values.productName}
          onChange={handleChange}
          className={cn(styles.input, 'textField')} />
        <label className={cn(styles.label, {
          [styles.label_active]: values.productName !== ''
        })}>Продукция</label>
      </div>

      <div className={styles.btn__wrapper}>
        <Button 
          type='submit'
          className='green'
          uppercase
        >Найти</Button>
      </div>  
    </form>
  )
}

export default ManufactureSearchForm
