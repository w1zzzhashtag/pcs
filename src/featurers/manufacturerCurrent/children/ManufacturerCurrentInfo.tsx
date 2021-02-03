import React from 'react'
import cn from 'classnames'

import { ThemeContext } from '../../../app/contexts'
import { manufacturerDataType } from './../manufacturerCurrentTypes'
import { AlbumImages } from './../../../components'

import styles from './ManufacturerCurrentInfo.module.scss'
import img1 from './../../../assets/images/ManufacturerCurrentPG/image-1.jpg'
import img2 from './../../../assets/images/ManufacturerCurrentPG/image-2.jpg'
import img3 from './../../../assets/images/ManufacturerCurrentPG/image-3.jpg'
import img4 from './../../../assets/images/ManufacturerCurrentPG/image-4.jpg'

interface iProps {
  data: manufacturerDataType
}

const ManufacturerCurrentInfo: React.FC<iProps> = ({ data }) => {
  const { theme } = React.useContext(ThemeContext)
  // const imagesArray = [
  //   { id: 1, url: img1, index: 0 },
  //   { id: 2, url: img2 },
  //   { id: 3, url: img3 },
  //   { id: 4, url: img4 },
  // ]
  const handle = () => {
    window.print()
  }

  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.text, styles[theme])}>
        <p title={data.shortName}
          className={styles.text__shortName}>
          {data.shortName}
        </p>

        <p title={data.fullName}
          className={styles.text__fullName}
        >
          {data.fullName.length > 150
            ? data.fullName.substr(0, 150) + '...'
            : data.fullName}
        </p>

        <p title={data.address}
          className={styles.text__address}
        >
          {data.address.length > 150
            ? data.address.substr(0, 150) + '...'
            : data.address}
        </p>
      </div>

      <div className={cn(styles.tags, styles[theme])}>
        {data.isFsin && (
          <p className={styles.tags__item}>ФСИН</p>
        )}
        {data.isSmp && (
          <p className={styles.tags__item}>СМП</p>
        )}
      </div>

      {data.description && <div className={cn(styles.production, styles[theme])}>
        <p className={styles.production__title}>Выпускаемая продукция</p>
        <p title={data.description}
          className={styles.production__desc}>
          {data.description.length > 150
            ? data.description.substr(0, 150) + '...'
            : data.description}
        </p>
      </div>}

      <div className={cn(styles.otherInfo, styles[theme])} style={{ width: `${!data.description && '100%'}` }}>
        <div className={styles.otherInfo__item}>
          <p className={styles.otherInfo__item__title}>ИНН</p>
          <p className={styles.otherInfo__item__value}>{data.inn}</p>
        </div>
        <div className={styles.otherInfo__item}>
          <p className={styles.otherInfo__item__title}>КПП</p>
          <p className={styles.otherInfo__item__value}>{data.kpp}</p>
        </div>
        <div className={styles.otherInfo__item}>
          <p className={styles.otherInfo__item__title}>ОГРН</p>
          <p className={styles.otherInfo__item__value}>{data.ogrn}</p>
        </div>
        <div className={styles.otherInfo__item}>
          <p className={styles.otherInfo__item__title}>ТЕЛ.</p>
          <a
            className={styles.otherInfo__item__value}
            href={`tel:${data.phone}`}
          >{data.phone}</a>
        </div>
        <div className={styles.otherInfo__item}>
          <p className={styles.otherInfo__item__title}>E-MAIL</p>
          <a
            className={styles.otherInfo__item__value}
            href={`mailto:${data.email}`}
          >{data.email}</a>
        </div>
        <div className={styles.otherInfo__item}>
          <p className={styles.otherInfo__item__title}>САЙТ</p>
          <a target="_blank"
            rel="noopener noreferrer"
            className={styles.otherInfo__item__value}
            href={`http://${data.website}`}
          >{data.website}</a>
        </div>
      </div>

      {/* {imagesArray.length !== 0 && (
        <AlbumImages images={imagesArray} placeholders />
      )} */}
    </div>
  )
}

export default ManufacturerCurrentInfo
