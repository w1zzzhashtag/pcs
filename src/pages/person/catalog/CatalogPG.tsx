import React from 'react'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion';
import { Link, Redirect } from 'react-router-dom';

import { fetchPersonCatalogData, setActiveFilter } from '../../../featurers/person/catalog/catalogSlice'
import { RootStoreType } from '../../../app/rootReducer'
import { activeFiltersType } from '../../../featurers/person/catalog/catalogTypes';

import { ThemeContext } from '../../../app/contexts';
import { Paginate, SomethingBroke, TableFilters } from '../../../components';
import { TableCatalog } from '../../../featurers/person/catalog/children'

import { defaultPageVariants } from '../../../app/variants'
import styles from './CatalogPG.module.scss'




const CatalogPG = () => {
  const dispatch = useDispatch()
  const { theme } = React.useContext(ThemeContext)

  const { access_token } = useSelector((state: RootStoreType) => state.authentication)
  const { data, filters, activeFilter, errorStack } = useSelector((state: RootStoreType) => state.personCatalog)

  const pageCount = Math.ceil(data.count / 12)
  const initialPageNumber = 1

  React.useEffect(() => {
    dispatch(fetchPersonCatalogData(initialPageNumber))
  }, [dispatch, initialPageNumber])

  const handlePageChange = (data: { selected: number }) => {
    dispatch(fetchPersonCatalogData(data.selected + 1))
  }
  const handleActiveFilters = (value: activeFiltersType) => {
    dispatch(setActiveFilter(value))
  }

  if (!access_token) {
    return <Redirect to='/authentication' />
  }

  return (
    <motion.div
      className={styles.wrapper}
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >

      {!errorStack ? <>
        <div className={cn(styles.header, styles[theme])}>
          <Link
            to="/person/catalog/product"
            className={styles.header__link}
          >Добавить позицию</Link>

          <TableFilters
            filters={filters}
            active={activeFilter}
            handleChange={handleActiveFilters as (value: string) => void} />
        </div>

        <TableCatalog />

        <Paginate
          pageCount={pageCount}
          onPageChange={handlePageChange} />
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default CatalogPG
