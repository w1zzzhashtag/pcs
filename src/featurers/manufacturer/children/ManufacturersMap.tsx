import React from 'react'
import { uniqBy } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Clusterer, Map, YMapsApi } from 'react-yandex-maps'

import { RootStoreType } from '../../../app/rootReducer'
import { regionItemType } from '../../region/regionTypes'
import { setCoords } from '../manufacturerSlice'

import { PlacemarkWrapper } from '../../../components'

import styles from './ManufacturersMap.module.scss'

interface P {
  activeRegion: regionItemType
}

const ManufacturersMap: React.FC<P> = ({ activeRegion }) => {
  const dispatch = useDispatch()

  const { data, isLoaded, coords } = useSelector((state: RootStoreType) => state.manufacturers)

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
    <div className={styles.map}>
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

export default ManufacturersMap
