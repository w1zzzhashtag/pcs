import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { ThemeContext } from '../../../app/contexts'
import { catalogGroupDataGroupsType } from './../catalogGroupTypes'

import styles from './CatalogGroupsListItem.module.scss'
import imgNotFound from './../../../assets/images/notFoundProduct.png'

interface iProps {
  data: catalogGroupDataGroupsType,
  url: string
}

const CatalogGroupsListItem: React.FC<iProps> = ({ data, url }) => {
  const { theme } = React.useContext(ThemeContext)

  const [isHover, setIsHover] = React.useState<boolean>(false)
  const handleHoverEffect = (val: boolean) => setIsHover(val)

  return (
    <div className={cn(styles.wrapper, styles[theme], {
      [styles.hovered]: isHover
    })}>
      <Link
        to={`${url}/${data.okpd2Group}`}
        onMouseEnter={() => handleHoverEffect(true)}
        onMouseLeave={() => handleHoverEffect(false)}
        className={styles.image_wrap}
      >
        <img
          src={data.imgSrc
            ? `http://api.promcase.ru/${data.imgSrc}`
            : imgNotFound}
          alt={data.nameGroup}
          className={styles.image} />
      </Link>

      <div className={styles.inner}>
        <div className={cn(styles.text, styles[theme])}>
          <Link title={data.nameGroup}
            to={`${url}/${data.okpd2Group}`}
            onMouseEnter={() => handleHoverEffect(true)}
            onMouseLeave={() => handleHoverEffect(false)}
            className={styles.text__nameGroup}
          >
            {data.nameGroup}
          </Link>
          <p className={styles.text__okpd2Group}>
            ОКПД2: <span>{data.okpd2Group}</span>
          </p>
          <p className={styles.text__productsCount}>
            Количество: <span>{data.productsCount}</span>
          </p>
        </div>

        <div className={cn(styles.otherInfo, styles[theme])}>
          <div className={styles.otherInfo__item}>
            <p className={styles.otherInfo__item__title}>Диапазон цен за единицу</p>
            <p className={styles.otherInfo__item__value}>{data.priceMin} р. - {data.priceMax} р.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CatalogGroupsListItem)
