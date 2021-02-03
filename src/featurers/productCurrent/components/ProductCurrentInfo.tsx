import React from 'react'
import cn from 'classnames'
import { dataType } from '../productCurrentTypes'
import { ThemeContext } from '../../../app/contexts'
import { AlbumImages } from '../../../components/index'
import styles from './ProductCurrentInfo.module.scss'
import printImg from './../../../assets/images/print.png'

interface P {
  data: dataType
}

const ProductCurrentInfo: React.FC<P> = ({ data }) => {
  const { theme } = React.useContext(ThemeContext)

  const onPrintPage = () => window.print()

  return (
    <div className={cn(styles.wrapper, styles[theme])}>
      <div className={cn(styles.text, styles[theme])}>
        <p title={data.name}
          className={styles.text__name}
        >
          {data.name.length > 100
            ? data.name.substr(0, 100) + '...'
            : data.name}
        </p>
        <p className={styles.text__okpd2Code}>ОКПД2: {data.okpd2Code}</p>

        <div title={data.ktruInfo}
          className={styles.text__item}
        >
          <p className={styles.text__item__title}>Описание</p>
          <p className={styles.text__item__value}>
            {data.ktruInfo.length > 400
              ? data.ktruInfo.substr(0, 400) + '...'
              : data.ktruInfo}
          </p>
        </div>

        {data.productSpecificationDTO.length !== 0 && (
          <div className={styles.text__item}>
            <p className={styles.text__item__title}>Характерискики</p>
            {data.productSpecificationDTO.map((item, i) => (
              <p className={styles.text__item__value} key={item.id}>
                <b>{i+1}. </b>
                {item.name}-{item.value}{item.unit.trim() ? `-${item.unit}` : ''}
              </p>
            ))}
          </div>
        )}

        {data.images && data.images.length !== 0 && (
          <div className={styles.text__item}>
            <p className={styles.text__item__title}>Изображения</p>
            <AlbumImages images={data.images} />
          </div>
        )}
      </div>

      <div className={cn(styles.otherInfo, styles[theme])}>
        <div className={styles.otherInfo__item}>
          <p className={styles.otherInfo__item__title}>Цена за единицу</p>
          <p className={styles.otherInfo__item__value}>{data.price} р.</p>
        </div>

        <div className={styles.otherInfo__item}>
          <p className={styles.otherInfo__item__title}>Единица измерения</p>
          <p className={styles.otherInfo__item__value}>{data.okeiName}</p>
        </div>
      </div>

      <svg 
        onClick={onPrintPage} 
        className={styles.print} 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <path d="M30.125 11.4113V8.4375C30.125 6.88669 28.8633 5.625 27.3125 5.625H25.8258L20.4761 0.27525C20.4749 0.274125 20.4736 0.273062 20.4725 0.271875C20.3063 0.107 20.0755 0.0045625 19.827 0.0006875C19.8221 0.000625 19.8174 0 19.8126 0H6.5625C6.04475 0 5.625 0.41975 5.625 0.9375V5.625H4.6875C3.13669 5.625 1.875 6.88669 1.875 8.4375V11.4113C0.783813 11.7983 0 12.8403 0 14.0625V25.4375C0 26.9883 1.26169 28.25 2.8125 28.25H5.625V31.0625C5.625 31.5802 6.04475 32 6.5625 32H25.4375C25.9552 32 26.375 31.5802 26.375 31.0625V28.25H29.1875C30.7383 28.25 32 26.9883 32 25.4375V14.0625C32 12.8403 31.2162 11.7983 30.125 11.4113ZM26.375 7.5H27.3125C27.8294 7.5 28.25 7.92056 28.25 8.4375V11.25H26.375V7.5ZM20.75 3.20081L23.1742 5.625H20.75V3.20081ZM7.5 1.875H18.875V6.5625C18.875 7.08025 19.2948 7.5 19.8125 7.5H24.5V11.25H7.5V1.875ZM3.75 8.4375C3.75 7.92056 4.17056 7.5 4.6875 7.5H5.625V11.25H3.75V8.4375ZM24.5 30.125H7.5V20.75H24.5V30.125ZM30.125 25.4375C30.125 25.9544 29.7044 26.375 29.1875 26.375H26.375V20.75H27.3125C27.8302 20.75 28.25 20.3302 28.25 19.8125C28.25 19.2948 27.8302 18.875 27.3125 18.875C26.5471 18.875 5.76425 18.875 4.6875 18.875C4.16975 18.875 3.75 19.2948 3.75 19.8125C3.75 20.3302 4.16975 20.75 4.6875 20.75H5.625V26.375H2.8125C2.29556 26.375 1.875 25.9544 1.875 25.4375V14.0625C1.875 13.5456 2.29556 13.125 2.8125 13.125C3.94637 13.125 27.8957 13.125 29.1875 13.125C29.7044 13.125 30.125 13.5456 30.125 14.0625V25.4375Z" />
        <path d="M21.6875 22.625H10.3125C9.79475 22.625 9.375 23.0447 9.375 23.5625C9.375 24.0803 9.79475 24.5 10.3125 24.5H21.6875C22.2052 24.5 22.625 24.0803 22.625 23.5625C22.625 23.0447 22.2052 22.625 21.6875 22.625Z" />
        <path d="M21.6875 26.375H10.3125C9.79475 26.375 9.375 26.7947 9.375 27.3125C9.375 27.8303 9.79475 28.25 10.3125 28.25H21.6875C22.2052 28.25 22.625 27.8303 22.625 27.3125C22.625 26.7947 22.2052 26.375 21.6875 26.375Z" />
        <path d="M6.5625 15H4.6875C4.16975 15 3.75 15.4197 3.75 15.9375C3.75 16.4553 4.16975 16.875 4.6875 16.875H6.5625C7.08025 16.875 7.5 16.4553 7.5 15.9375C7.5 15.4197 7.08025 15 6.5625 15Z" />
      </svg>
    </div>
  )
}

export default ProductCurrentInfo
