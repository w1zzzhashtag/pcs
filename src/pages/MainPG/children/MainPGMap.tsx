import React from 'react'
import { Map, Clusterer, YMapsApi } from 'react-yandex-maps'
import { useSelector, useDispatch } from 'react-redux'
import { uniqBy } from 'lodash'

import { RootStoreType } from '../../../app/rootReducer'
import {
  fetchManufacturersData, setCoords
} from './../../../featurers/manufacturer/manufacturerSlice'
import { PlacemarkWrapper } from './../../../components'

import styles from './../MainPG.module.scss'



const MainPGMap: React.FC = () => {
  const dispatch = useDispatch()

  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const { data, isLoaded, coords } = useSelector((state: RootStoreType) => state.manufacturers)

  React.useEffect(() => {
    dispatch(fetchManufacturersData())
  }, [dispatch])

  const geocode = (ymaps: YMapsApi) => {
    data.map(item => {
      return (ymaps.geocode(item.address)
        .then((res: any) => {
          dispatch(setCoords({
            id: item.id,
            name: item.shortName,
            address: item.address,
            coords: res.geoObjects.get(0).geometry.getCoordinates(),
          }))
        })
      )
    })
  }

  return (
    <div className={styles.topManufacturers__map}>
      {activeRegion && isLoaded && (
        <Map
          defaultState={{
            center: activeRegion.mapConfig.centerCoords,
            zoom: activeRegion.mapConfig.zoom,
            controls: ['zoomControl', 'fullscreenControl'],
          }}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
          onLoad={(ymaps: YMapsApi) => geocode(ymaps)}
          height={'100%'}
          width={'100%'}
        >
          <Clusterer
            options={{
              preset: 'islands#invertedBlackClusterIcons',
              groupByCoordinates: false,
            }}>
            {uniqBy(coords, 'id').map(item => (
              <PlacemarkWrapper key={item.id} data={item} />
            ))}
          </Clusterer>
        </Map>
      )}
    </div>
  )
}

export default MainPGMap
