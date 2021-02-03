import React from 'react'
import { useDispatch } from 'react-redux'
import { sendBid } from './../productCurrentSlice'
import { Button, TextField, TextareaField } from '../../../components'
import { reqValuesType, notReqValuesType, errorsType } from './../productCurrentTypes'
import { setError, setTimeoutToCloseAlert } from './../../alert/alertSlice'
import styles from './ProductCurrentForm.module.scss'
interface P {
  productId: number
  vendorId: number
  price: number
}

const initialStateReqValues: reqValuesType = {
  quantity: '',
  customerName: '',
  adress: '',
  inn: '',
  kpp: '',
  contactFio: '',
  phone: '',
  email: '',
}
const initialStateNotReqValues: notReqValuesType = {
  note: ''
}

const ProductCurrentForm: React.FC<P> = ({ productId, vendorId, price }) => {
  const dispatch = useDispatch()

  const [reqValues, setReqValues] = React.useState(initialStateReqValues)
  const [notReqValues, setNotReqValues] = React.useState(initialStateNotReqValues)
  let errors: errorsType = {}

  const handleChangeReqVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setReqValues((prev) => {
      switch (name) {
        case `quantity`: case 'inn': case 'kpp': case 'phone':
          return { ...prev, [name]: value.replace(/[^\d]/g, '') }
        default: return { ...prev, [name]: value }
      }
    })
  }

  const handleChangeNotReqValues = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNotReqValues((prev) => {
      return { ...prev, [name]: value }
    })
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    for (let item in reqValues) {
      if (reqValues[item] === '') {
        errors = { ...errors, [item]: true }
      }
    }

    if (Object.keys(errors).length === 0) {
      dispatch(sendBid({
        ...reqValues,
        ...notReqValues,
        vendorId: vendorId,
        productId: productId
      }))
    } else {
      dispatch(setError('Заполните все поля'))
      dispatch(setTimeoutToCloseAlert('error'))
    }
  }


  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="form__title">Заполните заявку</p>

      <TextField
        label="Количество"
        name="quantity"
        value={reqValues.quantity}
        onChange={handleChangeReqVal}
        maxLength={10}
        require
        className="w48" />

      <div className="form__price">
        <p className="form__price__title">Цена</p>
        <p className="form__price__value">{+reqValues.quantity * price} р.</p>
      </div>

      <TextField
        label="Наименование вашей организации"
        name="customerName"
        value={reqValues.customerName}
        require
        onChange={handleChangeReqVal} />
      <TextField
        label="Адрес поставки"
        name="adress"
        value={reqValues.adress}
        require
        onChange={handleChangeReqVal} />
      <TextField
        label="ИНН"
        name="inn"
        maxLength={12}
        value={reqValues.inn}
        require
        onChange={handleChangeReqVal}
        className="w48" />
      <TextField
        label="КПП"
        name="kpp"
        maxLength={9}
        value={reqValues.kpp}
        require
        onChange={handleChangeReqVal}
        className="w48" />
      <TextField
        label="Контактное лицо (Ф.И.О.)"
        name="contactFio"
        maxLength={30}
        value={reqValues.contactFio}
        require
        onChange={handleChangeReqVal} />
      <TextField
        label="Телефон"
        name="phone"
        value={reqValues.phone}
        maxLength={11}
        require
        onChange={handleChangeReqVal}
        className="w48" />
      <TextField
        label="E-mail"
        name="email"
        value={reqValues.email}
        maxLength={30}
        require
        onChange={handleChangeReqVal}
        className="w48" />
      <TextareaField
        label="Дополнительные требования"
        name="note"
        value={notReqValues.note}
        onChange={handleChangeNotReqValues} />

      <div className={styles.button__container}>
        <div className={styles.button__wrapper}>
          <Button
            type='submit'
            className='green'
            width='w100'
            uppercase
          >Отправить</Button>
        </div>

        <div className={styles.button__wrapper}>
          <Button
            type='button'
            className='white'
            width='w100'
            uppercase
          >В корзину</Button>
        </div>
      </div>
    </form>
  )
}

export default ProductCurrentForm
