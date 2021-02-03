import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { ThemeContext } from '../../../app/contexts'
import { groupProductsTovarsType } from '../../commonTypes'
import { RootStoreType } from '../../../app/rootReducer'

import styles from './CatalogGroupProductsListItem.module.scss'
import imgNotFound from './../../../assets/images/notFoundProduct.png'

interface iProps {
  data: groupProductsTovarsType
}

const CatalogGroupProductsListItem: React.FC<iProps> = ({ data }) => {
  const { theme } = React.useContext(ThemeContext)

  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const [isHover, setIsHover] = React.useState<boolean>(false)

  const handleHoverEffect = (val: boolean) => setIsHover(val)

  return (
    <div className={cn(styles.wrapper, styles[theme], {
      [styles.hovered]: isHover
    })}>
      <Link
        to={`/product/${data.id}`}
        onMouseEnter={() => handleHoverEffect(true)}
        onMouseLeave={() => handleHoverEffect(false)}
        className={styles.image_wrap}
      >
        <img
          src={data.imgSrc
            ? `http://api.promcase.ru/${data.imgSrc}`
            : imgNotFound}
          alt={data.name}
          className={styles.image} />
      </Link>

      <div className={styles.inner}>

        <div className={cn(styles.text, styles[theme])}>
          <Link title={data.name}
            to={`/product/${data.id}`}
            onMouseEnter={() => handleHoverEffect(true)}
            onMouseLeave={() => handleHoverEffect(false)}
            className={styles.text__name}
          >
            {data.name}
          </Link>
          <p title={data.organization}
            className={styles.text__organization}
          >
            {data.organization}
          </p>
          <p className={styles.text__okpdCode}>
            ОКПД2: <span>{data.okpdCode}</span>
          </p>
        </div>

        {activeRegion?.madeInKarelia && data.isQualityMark && (
          <img
            src={process.env.PUBLIC_URL + activeRegion?.madeInKarelia?.image_small}
            alt="Сделано в Карелии"
            className={styles.madeInKarelia} />
        )}

        <div className={cn(styles.otherInfo, styles[theme])}>
          <div className={styles.otherInfo__item}>
            <p className={styles.otherInfo__item__title}>Цена за единицу</p>
            <p className={styles.otherInfo__item__value}>{data.price} р.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CatalogGroupProductsListItem)
