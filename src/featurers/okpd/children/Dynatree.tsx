import React from 'react'
import cn from 'classnames'
import {useDispatch} from 'react-redux'

import { fetchNestedOkpdData } from '../okpdSlice'
import { dataType } from '../okpdTypes'

import styles from './Okpd.module.scss'
import arrowImg from './../../../assets/images/person/arrow.png'

interface P {
  value: string
  dataItem: dataType
  nestedData: {
    [index: string]: dataType[]
  }
  isNestedData: boolean
  handleOpenModal: (val: boolean) => void
  handleChangeOkpdCode: (val: string) => void
}

const Dynatree: React.FC<P> = ({ 
  value, dataItem, nestedData, isNestedData, handleOpenModal, handleChangeOkpdCode
}) => {
  const dispatch = useDispatch()

  const [listIsOpen, setListIsOpen] = React.useState<boolean>(false)
  const handleOpenList = () => setListIsOpen(!listIsOpen)

  React.useEffect(() => {
    listIsOpen && dispatch(fetchNestedOkpdData(dataItem.code))
  }, [dispatch, listIsOpen, dataItem.code])

  const handleChecked = () => {
    handleChangeOkpdCode(dataItem.code)
    handleOpenModal(false)
  }

  return (
    <div className={cn(styles.dynatree, {
      [styles.active] : listIsOpen
    })}>
      
      <div className={styles.dynatree__inner}>
        {dataItem.isFolder && <img 
          className={cn(styles.dynatree__expander, {
            [styles.active]: listIsOpen
          })}
          onClick={handleOpenList}
          src={arrowImg} 
          alt="arrow" 
        />}

        {isNestedData && <input 
          type="radio"
          className={styles.dynatree__checkbox}
          id={dataItem.code}
          name="okpdCode"
          value={dataItem.code}
          checked={value === dataItem.code} 
          onChange={handleChecked}
        />}

        <label
          className={styles.dynatree__title}
          htmlFor={dataItem.code}
        >
          <b>{dataItem.code}:</b>{dataItem.name}
        </label>
      </div>

      {listIsOpen && nestedData && nestedData[dataItem.code] && (
        <div className={styles.dynatree__list}>
          {nestedData[dataItem.code].map(item => (
            <Dynatree 
              key={item.id}
              value={value}
              dataItem={item}
              nestedData={nestedData}
              isNestedData={true}
              handleOpenModal={handleOpenModal}
              handleChangeOkpdCode={handleChangeOkpdCode} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dynatree