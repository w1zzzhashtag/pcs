import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { RootStoreType } from '../../app/rootReducer'
import { regionItemType } from '../../featurers/region/regionTypes'
import { fetchKareliaGroupData } from './../../featurers/kareliaGroup/kareliaGroupSlice'

import {
  Breadcrumbs,
  LoaderBreadcrumbs,
  LoaderListItem,
  SomethingBroke
} from './../../components'
import InformationMadeInKarelia from './children/InformationMadeInKarelia'
import SearchProductsForm from '../../featurers/searchProducts/SearchProductsForm'
import { CatalogGroupsListItem } from '../../featurers/catalogGroup/children'

import { defaultPageVariants } from '../../app/variants'


const KareliaGroupPG = () => {
  const dispatch = useDispatch()

  const activeRegion = useSelector((state: RootStoreType) => state.region.active as regionItemType)
  const { data, isLoaded, errorStack } = useSelector((state: RootStoreType) => state.kareliaGroup)

  React.useEffect(() => {
    dispatch(fetchKareliaGroupData())
  }, [dispatch])

  if (!activeRegion.madeInKarelia) return <Redirect to='/' />

  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="main__page"
    >

      {activeRegion && (
        <InformationMadeInKarelia activeRegion={activeRegion} />
      )}

      {!errorStack ? <>
        <div className="main__page__breadcrumbs">
          {isLoaded ? data && (
            <Breadcrumbs
              nestingLvl1={{
                text: 'Сделано в Карелии',
                link: '/made-in-karelia'
              }}
              count={data.totalProducts}
            />
          ) : <LoaderBreadcrumbs />}
        </div>

        <section className="main__page__inner">
          <div className="main__page__list">
            {isLoaded ? data && (
              data.groups.map(item => (
                <CatalogGroupsListItem
                  key={item.okpd2Group}
                  data={item}
                  url={`/made-in-karelia`} />
              ))) : Array(5).fill(0).map((_, i) => (
                <LoaderListItem key={i} />
              ))
            }
          </div>

          <aside className="main__page__aside">
            <SearchProductsForm />
          </aside>
        </section>
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default KareliaGroupPG
