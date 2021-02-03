import React from 'react'
import { useDispatch } from 'react-redux'

import { searchProductsValuesFormType } from './searchProductsTypes'
import { fetchSearchProductsData } from './searchProductsSlice'

import { Button, TextField, NumberField } from '../../components'

import styles from './SearchProductsForm.module.scss'


const initialState = {
  productName: '',
  okpd2: '',
  organizationName: '',
  priceMin: '',
  priceMax: ''
}

const SearchProductsForm: React.FC = () => {
  const dispatch = useDispatch()

  const [values, setValues] = React.useState<searchProductsValuesFormType>(initialState)

  const resetValues = () => {
    setValues(initialState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues(prev => ({ ...prev, [name]: value }))
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <TextField
        name="productName"
        label="Наименование"
        value={values.productName}
        onChange={handleChange} />
      <TextField
        name="okpd2"
        label="ОКПД2"
        value={values.okpd2}
        onChange={handleChange} />
      <TextField
        name="organizationName"
        label="Производитель"
        value={values.organizationName}
        onChange={handleChange} />
      <NumberField
        name="priceMin"
        label="Мин. цена"
        value={Number(values.priceMin)}
        className="w48"
        price
        onChange={handleChange} />

      <NumberField
        name="priceMax"
        label="Макс. цена"
        className="w48"
        value={Number(values.priceMax)}
        price
        onChange={handleChange} />

      <div className={styles.button__container}>
        <div className={styles.button__wrapper}>
          <Button
            type='submit'
            className='green'
            width='w100'
            uppercase
          >Поиск</Button>
        </div>
        <div className={styles.btn__wrapper}>
          <Button
            type='button'
            className='white'
            width='w100'
            uppercase
            handleClick={resetValues}
          >Очистить фильтр</Button>
        </div>
      </div>
    </form>
  )
}

export default SearchProductsForm
