import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { ThemeContext } from '../../../app/contexts'
import { CatalogListDataType } from './../catalogListTypes'

import styles from './CatalogListMain.module.scss'

interface iProps {
  list: CatalogListDataType[]
}

const CatalogListMain: React.FC<iProps> = ({ list }) => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <div className={styles.wrapper}>
      {list.map(item => (
        <Link
          key={item.id}
          to={`catalog-group/${item.id}`}
          className={cn(styles.item, styles[theme], {
            disabled: item.isCatalogEmpty
          })}
        >
          <img
            src={`http://api.promcase.ru/${item.imgSrc}`}
            alt={item.name}
            className={styles.item__icon} />
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default CatalogListMain
