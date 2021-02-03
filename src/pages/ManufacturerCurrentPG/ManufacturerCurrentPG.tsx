import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Map, Clusterer, YMapsApi } from 'react-yandex-maps'

import { RootStoreType } from '../../app/rootReducer'
import {
  fetchManufacturerCurrentData, setCoords,
} from '../../featurers/manufacturerCurrent/manufacturerCurrentSlice'

import {
  Breadcrumbs,
  PlacemarkWrapper,
  LoaderContentInfo,
  SomethingBroke,
} from '../../components'
import { ManufacturerCurrentInfo } from '../../featurers/manufacturerCurrent/children'
import ActualOffers from '../../featurers/actualOffers/ActualOffers'

import { defaultPageVariants } from '../../app/variants'
import styles from './ManufacturerCurrentPG.module.scss'

interface iParams {
  id: string | undefined
}

const ManufacturerCurrentPG = () => {
  const { id }: iParams = useParams()
  const dispatch = useDispatch()

  const [mapRef, setMapRef] = React.useState<any>(null)
  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const { data, isLoaded, coords, errorStack } = useSelector((state: RootStoreType) => state.manufacturerCurrent)


  // Получаем данные по организации
  React.useEffect(() => {
    dispatch(fetchManufacturerCurrentData(id))
  }, [dispatch, id])

  React.useEffect(() => {
    mapRef && coords && mapRef.setCenter(coords.coords)
  }, [mapRef, coords])

  const geocode = (ymaps: YMapsApi) => {
    return isLoaded && data && ymaps.geocode(data.address)
      .then((res: any) => {
        dispatch(setCoords({
          id: data.id,
          name: data.shortName,
          address: data.address,
          coords: res.geoObjects.get(0).geometry.getCoordinates(),
        }))
      })
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
        <div className="main__page__breadcrumbs">
          <Breadcrumbs
            nestingLvl1={{
              text: 'Реестр производителей',
              link: `/manufacturers`
            }}
            nestingLvl2={{
              text: 'Карточка производителя',
              link: `/manufacturers/${id}`
            }}
          />
        </div>

        <section className="main__page__inner">
          <div className="main__page__list">
            {isLoaded ? data && (
              <ManufacturerCurrentInfo data={data} />
            ) : <LoaderContentInfo />}
          </div>

          <aside className="main__page__aside">
            <div className={styles.map_wrapper}>
              {activeRegion && isLoaded && (
                <Map
                  defaultState={{
                    center: activeRegion.mapConfig.centerCoords,
                    zoom: activeRegion.mapConfig.zoom,
                    controls: ['zoomControl', 'fullscreenControl']
                  }}
                  modules={['control.ZoomControl', 'control.FullscreenControl']}
                  onLoad={(ymaps: YMapsApi) => geocode(ymaps)}
                  height={'100%'}
                  width={'100%'}
                  instanceRef={ref => setMapRef(ref)}
                >
                  <Clusterer
                    options={{
                      preset: 'islands#invertedBlackClusterIcons',
                      groupByCoordinates: false,
                    }}>
                    {coords && <PlacemarkWrapper data={coords} />}
                  </Clusterer>
                </Map>
              )}
            </div>
          </aside>
        </section>

        <section className="main__page__bottom">
          <ActualOffers id={id} />
        </section>
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default ManufacturerCurrentPG
