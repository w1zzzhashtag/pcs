import React from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import { RootStoreType } from '../../../../app/rootReducer'

import { LoaderTable, TableEmpty, TableHeadings } from '../../../../components'
import { TableBidsRow } from '.'

import { tableItemVariants } from '../../../../app/variants'



const TableBids = () => {
  const { tableHeadings, isLoaded, data } = useSelector((state: RootStoreType) => state.bids)

  return (
    <>
      {data.count !== 0 ? (
        <div className="table">

          <TableHeadings data={tableHeadings} />

          <div className="table__inner">
            {isLoaded ? (
              data.vendorBidListDTO.map((item, i) => (
                <AnimatePresence key={i}>
                  <motion.div
                    className="table__row"
                    variants={tableItemVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TableBidsRow data={item} />
                  </motion.div>
                </AnimatePresence>
              ))) : Array(12).fill(0).map((_, i) => (
                <LoaderTable key={i} />
              ))}
          </div>
        </div>
      ) : <TableEmpty />}
    </>
  )
}

export default TableBids
