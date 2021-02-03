import React from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { RootStoreType } from '../../../../app/rootReducer';
import { activeFiltersType } from '../catalogTypes';
import { setActiveFilter } from '../catalogSlice';

import { ThemeContext } from '../../../../app/contexts';
import { TableFilters } from '../../../../components';

import styles from './Header.module.scss'


const Header = () => {
  const dispatch = useDispatch()
  const { theme } = React.useContext(ThemeContext)

  const { filters, activeFilter } = useSelector((state: RootStoreType) => state.personCatalog)
  const handleActiveFilters = (value: activeFiltersType) => {
    dispatch(setActiveFilter(value))
  }

  return (
    <div className={cn(styles.wrapper, styles[theme])}>
      <NavLink
        to="/person/catalog/product"
        className={styles.link}
      >Добавить позицию</NavLink>

      <TableFilters
        filters={filters}
        active={activeFilter}
        handleChange={handleActiveFilters as (value: string) => void}/>
    </div>
  )
}

export default Header
