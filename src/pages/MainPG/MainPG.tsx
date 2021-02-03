import React from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { RootStoreType } from './../../app/rootReducer'

import { ThemeContext } from '../../app/contexts'
import { LoaderCatalogSixteenItems } from '../../components'
import {
  MainPGMap,
  InformationMadeInKarelia,
  InformationTopManufacturers,
  InformationDescriptionTop
} from './children'
import PopularProducts from '../../featurers/popularProducts/PopularProducts'
import { CatalogListMain } from '../../featurers/catalogList/children'

import { defaultPageVariants } from '../../app/variants'
import styles from './MainPG.module.scss'


const MainPG = () => {
  const { theme } = React.useContext(ThemeContext)

  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const catalogList = useSelector((state: RootStoreType) => state.catalogList.data)
  const catalogListIsLoaded = useSelector((state: RootStoreType) => state.catalogList.isLoaded)

  const [mapIsAceess, setMapIsAccess] = React.useState<boolean>(false)

  const handleAccessMap = () => setMapIsAccess(true)

  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={cn(styles.wrapper, styles[theme])}
    >

      {activeRegion && (
        <InformationDescriptionTop activeRegion={activeRegion} />
      )}


      <section className={styles.catalog}>
        <h3 className={styles.title}>Каталог продукции</h3>
        {catalogListIsLoaded
          ? <CatalogListMain list={catalogList} />
          : Array(2).fill(0).map((_, i) => <LoaderCatalogSixteenItems key={i} />)
        }
      </section>


      <section className={styles.popularProducts}>
        <h3 className={styles.title}>Популярные товары</h3>
        <PopularProducts />
      </section>


      <section className={styles.topManufacturers}>
        <h3 className={styles.title}>Топ производителей</h3>
        <InformationTopManufacturers />
        {mapIsAceess ? <MainPGMap /> : (
          <div
            onClick={handleAccessMap}
            className={cn(styles.topManufacturers__upperLayer, styles[theme])}
          >Нажмите, для отображения карты</div>
        )}
      </section>


      {activeRegion?.madeInKarelia && (
        <>
          <InformationMadeInKarelia activeRegion={activeRegion} />
          <PopularProducts />
        </>
      )}
      
    </motion.div>
  )
}

export default MainPG
