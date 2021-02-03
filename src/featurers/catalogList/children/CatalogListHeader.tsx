import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { RootStoreType } from '../../../app/rootReducer'
import styles from './CatalogListHeader.module.scss'


const CatalogListHeader = () => {
  const { data, isLoaded } = useSelector((state: RootStoreType) => state.catalogList)

  return (
    <>
      {isLoaded && data.map(item => (
        <NavLink
          to={`/catalog-group/${item.id}`}
          key={item.id}
          className={cn(styles.link, {
            disabled: item.isCatalogEmpty
          })}
          activeClassName={styles.link_active}
        >
          {item.name}
        </NavLink>
      ))
      }
    </>
  )
}

export default CatalogListHeader
