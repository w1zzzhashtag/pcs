import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreType } from '../../app/rootReducer'
import { fetchActualOffersData } from './actualOffersSlice'
import { LoaderSliderForProducts, SliderForProducts } from '../../components'

interface P {
  id: string | undefined
}

const ActualOffers: React.FC<P> = ({ id }) => {
  const dispatch = useDispatch()
  const { data, isLoaded } = useSelector((state: RootStoreType) => state.actualOffers)

  React.useEffect(() => {
    dispatch(fetchActualOffersData(id))
  }, [dispatch, id])

  return (
    <>
      {isLoaded ? data.length !== 0 && (
        <SliderForProducts
          data={data}
          sliderTitle={'Продукты'} />
      ) : <LoaderSliderForProducts />}
    </>
  )
}

export default ActualOffers
