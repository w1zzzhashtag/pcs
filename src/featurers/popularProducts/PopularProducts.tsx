import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreType } from '../../app/rootReducer'
import { LoaderSliderForProducts, SliderForProducts } from '../../components'
import { fetchPopularProductsData } from './popularProductsSlice'


const PopularProducts = () => {
  const dispatch = useDispatch()
  const { data, isLoaded } = useSelector((state: RootStoreType) => state.popularProducts)

  React.useEffect(() => {
    dispatch(fetchPopularProductsData())
  }, [dispatch])

  return (
    <>
      {isLoaded ? <SliderForProducts data={data} /> : <LoaderSliderForProducts />}
    </>
  )
}

export default PopularProducts
