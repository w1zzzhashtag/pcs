import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreType } from '../../app/rootReducer'
import { fetchCatalogGroupData } from './../../featurers/catalogGroup/catalogGroupSlice'

import {
  Breadcrumbs,
  LoaderBreadcrumbs,
  LoaderListItem,
  SomethingBroke
} from './../../components'
import SearchProductsForm from '../../featurers/searchProducts/SearchProductsForm'
import { CatalogGroupsListItem } from '../../featurers/catalogGroup/children'
import { defaultPageVariants } from '../../app/variants'

interface iParams {
  id: string | undefined
}

const CatalogGroupPG = () => {
  const { id }: iParams = useParams()
  const dispatch = useDispatch()

  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const { data, isLoaded, errorStack } = useSelector((state: RootStoreType) => state.catalogGroup)

  // Получаем данные по группам при первом рендере
  React.useEffect(() => {
    dispatch(fetchCatalogGroupData(id))
  }, [dispatch, id])

  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className='main__page'
    >

      {!errorStack ? <>
        <h1 className="main__page__title">
          КАТАЛОГ ПРОДУКЦИИ ВЫПУСКАЕМОЙ ПРЕДПРИЯТИЯМИ {activeRegion?.features.titleName}
        </h1>

        <div className="main__page__breadcrumbs">
          {isLoaded ? data && (
            <Breadcrumbs
              nestingLvl1={{
                text: data.name,
                link: `/catalog-group/${id}`
              }}
              count={data.groups.length}
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
                  url={`/catalog-group/${id}`} />
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

export default CatalogGroupPG
