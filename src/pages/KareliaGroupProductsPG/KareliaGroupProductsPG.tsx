import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'

import { RootStoreType } from '../../app/rootReducer'
import { regionItemType } from '../../featurers/region/regionTypes'
import { fetchKareliaGroupProductsData } from './../../featurers/kareliaGroupProducts/kareliaGroupProductsSlice'

import {
  Breadcrumbs,
  LoaderBreadcrumbs,
  LoaderListItem,
  SomethingBroke
} from './../../components'
import InformationMadeInKarelia from './children/InformationMadeInKarelia'
import SearchProductsForm from '../../featurers/searchProducts/SearchProductsForm'
import { CatalogGroupProductsListItem } from '../../featurers/catalogGroupProducts/children'

import { defaultPageVariants } from '../../app/variants'

interface iParams {
  okpd: string | undefined
}

const KareliaGroupProductsPG = () => {
  const { okpd }: iParams = useParams()
  const dispatch = useDispatch()

  const activeRegion = useSelector((state: RootStoreType) => state.region.active as regionItemType)
  const { data, isLoaded, errorStack } = useSelector((state: RootStoreType) => state.kareliaGroupProducts)

  React.useEffect(() => {
    dispatch(fetchKareliaGroupProductsData(okpd))
  }, [dispatch, okpd])

  if (!activeRegion.madeInKarelia) return <Redirect to='/' />

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
          {isLoaded ? data && data.subGroupName && (
            <Breadcrumbs
              nestingLvl1={{
                text: 'Сделано в Карелии',
                link: '/made-in-karelia'
              }}
              nestingLvl2={{
                text: data.subGroupName,
                link: `/made-in-karelia/${okpd}`
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
              ))) : Array(5).fill(0).map((_, i) => (
                <LoaderListItem key={i} />
              ))
            }
          </div>


          <aside className="main__page__aside">
            {activeRegion && (
              <InformationMadeInKarelia activeRegion={activeRegion} />
            )}
            <SearchProductsForm />
          </aside>
        </section>
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default KareliaGroupProductsPG
