import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { productsType } from '../catalogTypes'
import { deletePersonCatalogProduct, fetchPersonCatalogData } from '../catalogSlice'

import styles from './TableRow.module.scss'
import editImg from './../../../../assets/images/person/edit.png'
import deleteImg from './../../../../assets/images/person/delete.png'
import { getDate, getTime } from '../../../commonFeaturers'

interface P {
  data: productsType
}

const TableCatalogRow: React.FC<P> = ({ data }) => {
  const dispatch = useDispatch()

  const handleDelete = (id: number, name: string) => {    
    if(window.confirm(`Вы действительно хотите удалить товар "${name}"?`)) {
      dispatch(deletePersonCatalogProduct(id))
      dispatch(fetchPersonCatalogData(1))
    }
  }

  return (
    <>
      <Link to={`/person/catalog/product/${data.id}`} className="table__container major">
        <span className="table__item" style={{ width: '7%' }}>
          {data.registrationNumber}
        </span>

        <span className="table__item" style={{ width: '36%' }}>
          {data.name}
        </span>

        <span className="table__item" style={{ width: '12%' }}>
          {data.catalogName}
        </span>

        <span className="table__item" style={{ width: '10%' }}>
          {data.okpdCode}
        </span>

        <span className="table__item" style={{ width: '13%' }}>
          {data.price}
        </span>

        <span className="table__item" style={{ width: '8%' }}>
          Статус
        </span>

        <span className="table__item" style={{ width: '14%' }}>
          <span className="table__item__value">
            {getTime(data.createDate)}
          </span>
          <span className="table__item__value">
            {getDate(data.createDate)}
          </span>
        </span>
      </Link>

      <div className="table__container second">
        <Link to={`/person/catalog/product/${data.id}`}
          className={styles.edit}
        >
          <img src={editImg} alt="edit" />
        </Link>
        <button 
          className={styles.delete} 
          onClick={() => handleDelete(data.id, data.name)}
        >
          <img src={deleteImg} alt="deleteImg" />
        </button>
      </div>
    </>
  )
}

export default TableCatalogRow
