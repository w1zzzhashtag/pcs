import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { RootStoreType } from '../../app/rootReducer'
import { fetchFsinData, fetchFsinOptions } from './../../featurers/fsin/fsinSlice'

import {
  Breadcrumbs,
  LoaderBreadcrumbs,
  LoaderListItem,
  SomethingBroke
} from './../../components'
import FsinForm from '../../featurers/fsin/FsinForm'
import { CatalogGroupProductsListItem } from '../../featurers/catalogGroupProducts/children'

import { defaultPageVariants } from '../../app/variants'


const FsinPG = () => {
  const dispatch = useDispatch()
  const { data, isLoaded, options, optionsIsLoaded, errorStack } = useSelector((state: RootStoreType) => state.fsin)

  React.useEffect(() => {
    dispatch(fetchFsinData())
    dispatch(fetchFsinOptions())
  }, [dispatch])

  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="main__page"
    >

      {!errorStack ? <>
        <div className="main__page__breadcrumbs">
          {isLoaded ? data && (
            <Breadcrumbs
              nestingLvl1={{
                text: 'Каталог продукции УФСИН',
                link: '/fsin'
              }}
              count={data.totalProducts}
            />
          ) : <LoaderBreadcrumbs />}
        </div>

        <section className="main__page__inner">
          <div className="main__page__list">
            {isLoaded ? data && (
              data.tovars.map(item => (
                <CatalogGroupProductsListItem
                  key={item.id}
                  data={item} />
              ))
            ) : Array(5).fill(0).map((_, i) => <LoaderListItem key={i} />)}
          </div>

          <aside className="main__page__aside">
            {optionsIsLoaded && options && <FsinForm fsinOptions={options} />}
          </aside>
        </section>
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default FsinPG
