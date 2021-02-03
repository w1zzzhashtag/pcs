import React from 'react'
import Slider from "react-slick";
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ThemeContext } from '../../../app/contexts';
import { popularProductsDataType } from './../../../featurers/popularProducts/popularProductsTypes'
import { RootStoreType } from '../../../app/rootReducer';

import styles from './SliderForProducts.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgNotFound from './../../../assets/images/notFoundProduct.png'

interface iProps {
  data: popularProductsDataType[],
  sliderTitle?: string
}

const SliderForProducts: React.FC<iProps> = ({ data, sliderTitle }) => {
  const { theme } = React.useContext(ThemeContext)
  const activeRegion = useSelector((state: RootStoreType) => state.region.active)

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5
  }

  return (
    <div className={cn(styles.wrapper, styles[theme])}>
      {sliderTitle && (
        <span className={styles.title}>{sliderTitle}</span>
      )}

      <Slider {...settings}>
        {data.map(item => (
          <Link
            className={styles.item}
            key={item.id}
            to={`/product/${item.id}`}
          >
            <div className={cn(styles.content, styles[theme])}>
              <div className={styles.image_wrapper}>
                <img
                  className={styles.image}
                  src={item.imgSrc ? `http://api.promcase.ru/${item.imgSrc}` : imgNotFound}
                  alt={item.productName} />
              </div>

              <div className={styles.text}>
                <p title={item.productName}
                  className={cn(styles.text__productName, styles[theme])}
                >
                  {item.productName}
                </p>
                <p title={item.productName}
                  className={cn(styles.text__organizationName, styles[theme])}
                >
                  {item.organizationName && item.organizationName.length > 45
                    ? item.organizationName.substr(0, 45) + '...'
                    : item.organizationName}
                </p>

                <footer className={cn(styles.footer, styles[theme])}>
                  <p className={styles.footer__price}>
                    {item.price} р.
                  </p>

                  {activeRegion?.madeInKarelia
                    && item.isQualityMark && (
                      <img
                        src={process.env.PUBLIC_URL + activeRegion.madeInKarelia.image_small}
                        alt={activeRegion.features.logoName}
                        className={styles.footer__imgMadeInKarelia} />
                    )}
                </footer>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default SliderForProducts
