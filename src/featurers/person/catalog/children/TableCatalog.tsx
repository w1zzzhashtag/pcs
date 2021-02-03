import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { LoaderTable, TableHeadings, TableEmpty } from '../../../../components'
import { TableCatalogRow } from '.'

import { RootStoreType } from '../../../../app/rootReducer'

import { tableItemVariants } from '../../../../app/variants'


const TableCatalog = () => {
  const { tableHeadings, data, isLoaded } = useSelector((state: RootStoreType) => state.personCatalog)

  return (
    <>
      {data.count !== 0 ? (
        <div className="table">

          <TableHeadings data={tableHeadings} />

          <div className="table__inner">
            {isLoaded ? (
              data.productsDTO.map((item, i) => (
                <AnimatePresence key={i}>
                  <motion.div
                    className="table__row"
                    variants={tableItemVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TableCatalogRow data={item} />
                  </motion.div>
                </AnimatePresence>
              ))
            ) : Array(12).fill(0).map((_, i) => (
              <LoaderTable key={i} />
            ))}
          </div>
        </div>
      ) : <TableEmpty />}
    </>
  )
}

export default TableCatalog
