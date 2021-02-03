import React from 'react'
import { TextField, NumberField, TextareaField } from '../../../../components'
import {dataType} from '../catalogProductTypes'
import styles from './CatalogProduct.module.scss'

interface P {
  values: dataType
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Basic: React.FC<P> = ({ values, handleChange }) => {
  return (
    <div className={styles.basic}>
      <h6>Основные сведения</h6>
      <TextField
        label='Наименвоание позиции'
        name='name'
        value={values.name}
        require
        onChange={handleChange} />
      <TextField
        label='Ед. измерения'
        name='okeiName'
        value={values.okeiName}
        className='w48'
        require
        onChange={handleChange} />
      <NumberField 
        label='Стоимость'
        name='price'
        value={values.price}
        className='w48'
        step={0.01}
        require price
        onChange={handleChange} />  
      <TextareaField
        label='Описание товара'
        name='ktruInfo'
        value={values.ktruInfo}
        onChange={handleChange} />
    </div>
  )
}

export default Basic
