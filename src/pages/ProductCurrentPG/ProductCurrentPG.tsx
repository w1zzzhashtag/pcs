import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreType } from '../../app/rootReducer'
import { fetchProductCurrent } from './../../featurers/productCurrent/productCurrentSlice'
import { fetchManufacturerCurrentData } from '../../featurers/manufacturerCurrent/manufacturerCurrentSlice'

import {
  LoaderContentInfo,
  LoaderListItem,
  SomethingBroke
} from './../../components'
import {
  ProductCurrentForm,
  ProductCurrentInfo
} from '../../featurers/productCurrent/components'
import { ManufacturerListItem } from '../../featurers/manufacturer/children'

import { defaultPageVariants } from '../../app/variants'


const ProductCurrentPG = () => {
  const { productId }: any = useParams()
  const dispatch = useDispatch()

  const { data, isLoaded, errorStack } = useSelector((state: RootStoreType) => state.productCurrent)
  const manufacturer = useSelector((state: RootStoreType) => state.manufacturerCurrent.data)
  const manufacturerIsLoaded = useSelector((state: RootStoreType) => state.manufacturerCurrent.isLoaded)

  // Получаю данные по продукту
  React.useEffect(() => {
    dispatch(fetchProductCurrent(productId))
  }, [dispatch, productId])

  // После поулчаю данные по органитзации
  React.useEffect(() => {
    if (isLoaded && data) {
      dispatch(fetchManufacturerCurrentData(String(data.organizationId)))
    }
  }, [dispatch, isLoaded, data])


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
          {data && data.name}
        </h1>

        <section className="main__page__inner">
          <div className="main__page__list">
            {isLoaded ? data && (
              <ProductCurrentInfo data={data} />
            ) : <LoaderContentInfo />}

            {manufacturerIsLoaded ? manufacturer && (
              <ManufacturerListItem
                data={manufacturer} />
            ) : <LoaderListItem />}
          </div>


          <aside className="main__page__aside">
            {isLoaded && data && (
              <ProductCurrentForm
                productId={Number(productId)}
                vendorId={data.organizationId}
                price={data.price} />
            )}
          </aside>
        </section>
        
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default ProductCurrentPG
