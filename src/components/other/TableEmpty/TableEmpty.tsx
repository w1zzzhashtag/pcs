import React from 'react'
import { Link } from 'react-router-dom'
import styles from './TableEmpty.module.scss'


const TableEmpty = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>У вас пока нету никаких позиций</p>
      <Link
        to="/person/catalog/product"
        className={styles.link}
      >Добавить позицию</Link>
    </div>
  )
}

export default TableEmpty
