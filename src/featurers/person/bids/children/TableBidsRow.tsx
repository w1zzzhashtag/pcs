import React from 'react'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreType } from '../../../../app/rootReducer'
import { Button, Modal } from '../../../../components'
import { bidsType } from '../bidsTypes'
import { getDate, getTime } from '../../../commonFeaturers'
import {sendEmail} from './../bidsSlice'

import styles from './TableBidsRow.module.scss'
import { setError, setTimeoutToCloseAlert } from '../../../alert/alertSlice'

interface P {
  data: bidsType
}

// status: 1=response 2=denied
type modalStateType = false | 1 | 2

const TableBidsRow: React.FC<P> = ({ data }) => {
  const dispatch = useDispatch()
  const { tableHeadings, activeFilter } = useSelector((state: RootStoreType) => state.bids)

  const [modalIsOpen, setModalIsOpen] = React.useState<modalStateType>(false)
  const [value, setValue] = React.useState('')

  const handleOpenPopup = (val: modalStateType) => setModalIsOpen(val)
  const handleChangeTextAreaValue = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target
    setValue(value)
  }

  
  const handleSendBidResponse = () => {
    if(value.trim()) {
      dispatch(sendEmail(data.id, value))
      handleOpenPopup(false)
    } else {
      dispatch(setError('Введите текст сообщения'))
      dispatch(setTimeoutToCloseAlert('error'))
    }
  }
  return (
    <>
      <div className="table__container major">
        <span className="table__item" style={{ width: tableHeadings[0].width + '%' }}>
          {data.id}
        </span>

        <span className="table__item" style={{ width: tableHeadings[1].width + '%' }}>
          {data.productName}
        </span>

        <span className="table__item" style={{ width: tableHeadings[2].width + '%' }}>
          <span className="table__item__value">
            {data.customerName}
          </span>
          <span className="table__item__value">
            ИНН: {data.inn}
          </span>
          <span className="table__item__value">
            КПП: {data.kpp}
          </span>
        </span>

        <span className="table__item" style={{ width: tableHeadings[3].width + '%' }}>
          {data.adress}
        </span>

        <span className="table__item" style={{ width: tableHeadings[4].width + '%' }}>
          <span className="table__item__value">
            {data.contactFio}
          </span>
          <span className="table__item__value">
            {data.email}
          </span>
          <span className="table__item__value">
            {data.phone}
          </span>
        </span>

        <span className="table__item" style={{ width: tableHeadings[5].width + '%' }}>
          {data.note}
        </span>

        <span className="table__item" style={{ width: tableHeadings[6].width + '%' }}>
          {data.quantity}
        </span>

        <span className="table__item" style={{ width: tableHeadings[7].width + '%' }}>
          {data.totalPrice}
        </span>

        <span className="table__item" style={{ width: tableHeadings[8].width + '%' }}>
          <span className="table__item__value">
            {getTime(data.bidDateTime)}
          </span>

          <span className="table__item__value">
            {getDate(data.bidDateTime)}
          </span>
        </span>
      </div>

      <div className="table__container second">
        {activeFilter === 'VendorBidPage' ? (
          <div className={styles.buttons__container}>
            <div className={styles.buttons__wrapper}>
              <Button
                type="button"
                className="green"
                width="w100"
                handleClick={() => handleOpenPopup(1)}
              >Ответить</Button>
            </div>

            <Button
              type="button"
              className="red"
              width="w100"
              handleClick={() => handleOpenPopup(2)}
            >Отказаться</Button>
          </div>
        ) : (
            <span className={cn(styles.status, {
              [styles.green] : data.status === 1,
              [styles.red] : data.status === 2,
            })}>
              {data.status === 1 && 'Принято'}
              {data.status === 2 && 'Отклонено'}
            </span>
          )}
      </div>

      {modalIsOpen && (
        <Modal handleOpen={handleOpenPopup as (val: boolean) => void}>
          <div className="modal-container">
            <p className="modal-container__header">
              {modalIsOpen === 1 ? 'Подтвердить заявку' : 'Отклонить заявку'}
            </p>

            <div className="modal-container__content">
              <p className={styles.popup__title}>
                {modalIsOpen === 1 ? 'Сообщение покупателю:' : 'Причина отказа:'}
              </p>
              <textarea
                value={value}
                onChange={handleChangeTextAreaValue}
                className={cn(styles.popup__textArea, {
                  [styles.green]: modalIsOpen === 1,
                  [styles.red]: modalIsOpen === 2,
                })} />
            </div>

            <div className="modal-container__footer">
              <Button
                type="button"
                handleClick={handleSendBidResponse}
                className={modalIsOpen === 1 ? 'green' : 'red'}
              >
                {modalIsOpen === 1 ? 'Подтвердить' : 'Отклонить'}
              </Button>
            </div>
          </div>

        </Modal>
      )}
    </>
  )
}


export default TableBidsRow
