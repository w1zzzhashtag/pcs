import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { savedQueriesPayloadItem, savedQueriesPayloadName } from './../../../searchGlobalTypes'
import { groupProductsTovarsType } from '../../../../commonTypes'
import { manufacturerDataType } from '../../../../manufacturerCurrent/manufacturerCurrentTypes'
import { handleOpenModal, saveQuery } from '../../../searchGlobalSlice'

import styles from './Results.module.scss'

interface P {
  productsLength: number
  organizationsLength: number
  products: groupProductsTovarsType[]
  organizations: manufacturerDataType[]
  searchValue: string | undefined
}

const Results: React.FC<P> = ({
  productsLength, organizationsLength, products, organizations, searchValue
}) => {
  const dispatch = useDispatch()

  const closeModal = () => dispatch(handleOpenModal(false))

  const handleClickItem = (item: savedQueriesPayloadItem, name: savedQueriesPayloadName) => {
    dispatch(saveQuery({ item, name }))
    closeModal()
  }

  return (
    <div className={styles.wrapper}>
      {productsLength !== 0 && <div className={styles.block}>
        <p className={styles.block__title}>Продукты</p>
        {products.map((item, i) => {
          if (i <= 9) {
            return (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                onClick={() => handleClickItem(item, 'products')}
                className={styles.item}
              >{item.name}</Link>
            )
          } else return null
        })}
      </div>
      }
      {organizationsLength !== 0 && <div className={styles.block}>
        <p className={styles.block__title}>Организации</p>
        {organizations.map((item, i) => {
          if (i <= 9) {
            return (
              <Link
                to={`/manufacturers/${item.id}`}
                key={item.id}
                onClick={() => handleClickItem(item, 'organizations')}
                className={styles.item}
              >{item.shortName}</Link>
            )
          } else return null
        })}
      </div>
      }
      {(productsLength > 10 || organizationsLength > 10) && (
        <Link
          to={`/search/${searchValue}`}
          onClick={closeModal}
          className={styles.seeAll}
        >
          Посмотреть все {productsLength + organizationsLength} результатов
        </Link>
      )}
    </div>
  )
}

export default Results
