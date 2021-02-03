import React from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'

import { ThemeContext } from '../../../../app/contexts'
import { TextField } from '../../../../components'

import { charactsType, charactsValuesType } from '../catalogProductTypes'
import { setError, setTimeoutToCloseAlert } from '../../../alert/alertSlice'

import styles from './CatalogProduct.module.scss'
import addImg from './../../../../assets/images/person/plus.png'
import deleteImg from './../../../../assets/images/person/delete.png'


const initialState = {
  name: '', value: '', unit: ''
}
interface P {
  items: charactsType[]
  handleAddCharacts: (item: charactsValuesType) => void
  handleDeleteCharacts: (id: number) => void
}

const Characts: React.FC<P> = ({ items, handleAddCharacts, handleDeleteCharacts }) => {
  const dispatch = useDispatch()
  const { theme } = React.useContext(ThemeContext)

  const [values, setValues] = React.useState<charactsValuesType>(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (values.name.trim() !== '' &&
      values.value.trim() !== ''
    ) {
      handleAddCharacts(values)
      setValues(initialState)
    } else {
      dispatch(setError('Заполните все обязательные поля у характеристик!'))
      dispatch(setTimeoutToCloseAlert('error'))
    }
  }

  const handleDelete = (id: number) => handleDeleteCharacts(id)

  return (
    <div className={cn(styles.characts, styles[theme])}>
      <h6>Характеристики</h6>

      <div className={styles.characts__form}>
        <div className={styles.characts__item}>
          <TextField
            label='Наименование характеристики'
            name='name'
            value={values.name}
            require
            onChange={handleChange} />
        </div>
        <div className={styles.characts__item}>
          <TextField
            label='Значение характеристики'
            name='value'
            value={values.value}
            require
            onChange={handleChange} />
        </div>
        <div className={styles.characts__item}>
          <TextField
            label='Ед. измерения'
            name='unit'
            value={values.unit}
            onChange={handleChange} />
        </div>

        <button type="button"
          className={cn(styles.characts__button, styles.add)}
        >
          <img
            src={addImg}
            alt="add"
            onClick={handleAdd} />
        </button>
      </div>

      {items.length !== 0 && items.map(item => {
        if (item.status !== 'D') return (
          <div className={styles.characts__row} key={item.id}>
            <div className={styles.characts__item}>
              {item.name}
            </div>
            <div className={styles.characts__item}>
              {item.value}
            </div>
            <div className={styles.characts__item}>
              {item.unit}
            </div>
            <button type="button"
              className={cn(styles.characts__button, styles.delete)}
            >
              <img
                src={deleteImg}
                alt="delete"
                onClick={() => handleDelete(item.id as number)} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Characts
