import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import {
  Breadcrumbs,
  LoaderBreadcrumbs,
  LoaderListItem,
  SomethingBroke
} from './../../components'
import SearchProductsForm from '../../featurers/searchProducts/SearchProductsForm'
import { CatalogGroupProductsListItem } from '../../featurers/catalogGroupProducts/children'

import { RootStoreType } from '../../app/rootReducer'
import { fetchCatalogGroupProductsData } from './../../featurers/catalogGroupProducts/catalogGroupProductsSlice'

import { defaultPageVariants } from '../../app/variants'

interface iParams {
  id: string | undefined
  okpd: string | undefined
}

const CatalogGroupProductsPG = () => {
  const { id, okpd }: iParams = useParams()
  const dispatch = useDispatch()

  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const { data, isLoaded, errorStack } = useSelector((state: RootStoreType) => state.catalogGroupProducts)

  // Получаю все продукты при первом рендере
  React.useEffect(() => {
    dispatch(fetchCatalogGroupProductsData(id, okpd))
  }, [dispatch, id, okpd])


  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="main__page"
    >

      {!errorStack ? <>
        <h1 className="main__page__title">
          КАТАЛОГ ПРОДУКЦИИ ВЫПУСКАЕМОЙ ПРЕДПРИЯТИЯМИ {activeRegion?.features.titleName}
        </h1>

        <div className="main__page__breadcrumbs">
          {isLoaded && data && data.groupName && data.subGroupName ? (
            <Breadcrumbs
              nestingLvl1={{
                text: data.groupName,
                link: `/catalog-group/${id}`
              }}
              nestingLvl2={{
                text: data.subGroupName,
                link: `/catalog-group/${id}/${okpd}`
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
            <SearchProductsForm />
          </aside>
        </section>
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default CatalogGroupProductsPG
