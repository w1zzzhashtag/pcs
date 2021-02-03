import React from 'react'
import { useDispatch } from 'react-redux'

import { fsinOptionsType } from './fsinTypes'
import { sendFsinOptions } from './fsinSlice'

import { TextField, CheckboxField, SelectField, Button, NumberField } from '../../components'

import styles from './FsinForm.module.scss'

interface P {
  fsinOptions: fsinOptionsType,
}

const FsinForm: React.FC<P> = ({ fsinOptions }) => {
  const dispatch = useDispatch()
  const [values, setValues] = React.useState<fsinOptionsType>(fsinOptions)
  const initialValues = fsinOptions

  // Чекбоксы
  const handleChangeOrganizationValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setValues({
      ...values,
      searchOptionsOrganizations: values.searchOptionsOrganizations.map(item => {
        if (item.name === name) {
          return { ...item, checked: !item.checked }
        } return item
      })
    })
  }


  // Прочие значения
  const handleChangeOtherValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if(name === 'priceMin' || name === 'priceMax') {
      setValues({ ...values, [name]: Number(value) })
      return
    }
    setValues({ ...values, [name]: value })
  }


  // Селект
  const handleChangeCatalogValues = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    values.searchOptionsCatalogs.forEach(item => {
      if (item.name === value) {
        setValues({ ...values, [name]: item })
      }
    })
  }

  // Диспатчим значения формы 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(sendFsinOptions(values))
    window.scrollTo({
      top: 0, left: 0, behavior: 'smooth'
    })
  }


  // Сброс всех значений формы
  const resetValues = (e: React.FormEvent) => {
    e.preventDefault()
    setValues(initialValues)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="form__caption">Производитель</p>
      {values.searchOptionsOrganizations.map(item => (
        <CheckboxField
          key={item.id}
          name={item.name}
          checked={item.checked}
          onChange={handleChangeOrganizationValues}
          label={item.name}
          className="w100" />
      ))}

      <TextField
        name="name"
        label="Наименование"
        value={values.name}
        onChange={handleChangeOtherValues} />

      <SelectField
        label="Катагория"
        name="searchOptionsCatalogsActive"
        value={values.searchOptionsCatalogsActive.name}
        onChange={handleChangeCatalogValues}
      >
        {values.searchOptionsCatalogs.map(item => (
          <option
            key={item.id}
            value={item.name}
          >{item.name}</option>
        ))}
      </SelectField>

       <NumberField 
        label='Мин. цена'
        name='priceMin'
        value={values.priceMin}
        className='w48'
        step={0.01}
        require price
        onChange={handleChangeOtherValues} /> 
      <NumberField 
        label='Макс. цена'
        name='priceMax'
        value={values.priceMax}
        className='w48'
        step={0.01}
        require price
        onChange={handleChangeOtherValues} />     

      <div className={styles.button__container}>
        <div className={styles.button__wrapper}>
          <Button
            type='submit'
            className='green'
            width='w100'
            uppercase
          >Поиск</Button>
        </div>

        <div className={styles.button__wrapper}>
          <Button
            type='submit'
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

export default FsinForm
