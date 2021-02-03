import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { RootStoreType } from '../../../app/rootReducer'
import { activeFiltersType } from '../../../featurers/person/bids/bidsTypes'
import { fetchBidsData, setActiveFilter } from '../../../featurers/person/bids/bidsSlice'

import { Paginate, SomethingBroke, TableFilters } from '../../../components'
import { TableBids } from './../../../featurers/person/bids/children'

import { defaultPageVariants } from '../../../app/variants'
import styles from './BidsPG.module.scss'
import { number } from 'yup'


const BidsPG = () => {
  const dispatch = useDispatch()

  const { access_token } = useSelector((state: RootStoreType) => state.authentication)
  const { filters, activeFilter, data, errorStack } = useSelector((state: RootStoreType) => state.bids)

  const pageCount = Math.ceil(data.count / 12)
  const initialPageNumber = 1

  React.useEffect(() => {
    dispatch(fetchBidsData(initialPageNumber))
  }, [dispatch])

  const handlePageChange = (data: { selected: number }) => {
    dispatch(fetchBidsData(data.selected + 1))
  }

  const handleActiveFilters = (value: activeFiltersType) => {
    dispatch(setActiveFilter(value))
    dispatch(fetchBidsData(initialPageNumber))
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
        <div className={styles.header}>
          <TableFilters
            filters={filters}
            active={activeFilter}
            handleChange={handleActiveFilters as (value: string) => void} />
        </div>

        <div className={styles.content}>
          <TableBids />
        </div>

        <Paginate
          pageCount={pageCount}
          onPageChange={handlePageChange} />
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default BidsPG
