import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { manufacturersValuesFormType, manufacturersSortByType } from '../../featurers/manufacturer/manufacturerTypes'
import { regionItemType } from '../../featurers/region/regionTypes'
import { RootStoreType } from '../../app/rootReducer'
import {
  fetchManufacturersData,
  fetchManufacturersDataWithSorting,
  setSortActive
} from '../../featurers/manufacturer/manufacturerSlice'

import { LoaderListItem, SomethingBroke } from '../../components'
import {
  ManufacturerSortBy,
  ManufactureSearchForm,
  ManufacturerListItem,
  ManufacturersMap,
  ManufacturersMapUpperLayer
} from './../../featurers/manufacturer/children'

import { defaultPageVariants } from '../../app/variants'
import styles from './ManufacturersPG.module.scss'


const ManufacturersPG = () => {
  const dispatch = useDispatch()

  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const { data, isLoaded, sortBy, sortActive, errorStack } = useSelector((state: RootStoreType) => state.manufacturers)

  const [openSort, setOpenSort] = React.useState<boolean>(false)
  const [mapIsAccess, setMapIsAccess] = React.useState<boolean>(false)
  const [valuesForm, setValuesForm] = React.useState<manufacturersValuesFormType>({
    name: '',
    inn: '',
    productName: '',
  })


  React.useEffect(() => {
    dispatch(fetchManufacturersData())
  }, [dispatch])


  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValuesForm(prev => {
      return { ...prev, [name]: value }
    })
  }
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(fetchManufacturersDataWithSorting(valuesForm))
  }


  const handleOpenSort = () => {
    setOpenSort(!openSort)
  }
  const handleActiveSortItem = (item: manufacturersSortByType) => {
    dispatch(setSortActive(item))
    setOpenSort(false)
  }
  React.useEffect(() => {
    if (sortActive) {
      dispatch(fetchManufacturersDataWithSorting(valuesForm, sortActive.query))
    }
  }, [dispatch, sortActive])


  const handleAccessMap = () => {
    setMapIsAccess(true)
  }

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
          РЕЕСТР ПРОИЗВОДИТЕЛЕЙ {activeRegion?.features.titleName}
        </h1>

        <ManufactureSearchForm
          values={valuesForm}
          handleChange={handleChangeForm}
          handleSubmit={handleSubmitForm} />

        <ManufacturerSortBy
          items={sortBy}
          active={sortActive}
          handleActive={handleActiveSortItem}
          open={openSort}
          handleOpen={handleOpenSort} />

        <section className="main__page__inner">
          <div className="main__page__list">
            {isLoaded ? (
              data.map(item => (
                <ManufacturerListItem
                  key={item.id}
                  data={item} />
              ))) : Array(5).fill(0).map((_, i) => (
                <LoaderListItem key={i} />
              ))
            }
          </div>

          <aside className="main__page__aside">
            {mapIsAccess ?
              <ManufacturersMap activeRegion={activeRegion as regionItemType} /> :
              <ManufacturersMapUpperLayer handleAccessMap={handleAccessMap} />
            }
            {isLoaded && (
              <p className={styles.count}>
                Количество организаций: <span>{data.length}</span>
              </p>
            )}
          </aside>

        </section>
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default ManufacturersPG
