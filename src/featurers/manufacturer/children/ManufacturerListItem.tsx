import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { ThemeContext } from '../../../app/contexts'
import { manufacturerDataType } from './../../manufacturerCurrent/manufacturerCurrentTypes'

import styles from './ManufacturerListItem.module.scss'

interface iProps {
  data: manufacturerDataType
}

const ManufacturerListItem: React.FC<iProps> = ({ data }) => {
  const { theme } = React.useContext(ThemeContext)

  const [isHover, setIsHover] = React.useState<boolean>(false)
  const handleHoverEffect = (val: boolean) => setIsHover(val)

  return (
    <div className={cn(styles.wrapper, styles[theme], {
      [styles.hovered]: isHover
    })}>
      <div className={cn(styles.text, styles[theme])}>
        <Link
          to={`/manufacturers/${data.id}`}
          className={styles.text__shortName}
          title={data.shortName}
          onMouseEnter={() => handleHoverEffect(true)}
          onMouseLeave={() => handleHoverEffect(false)}
        >
          {data.shortName}
        </Link>

        <p
          className={styles.text__fullName}
          title={data.fullName}
        >
          {data.fullName.length > 150
            ? data.fullName.substr(0, 150) + '...'
            : data.fullName}
        </p>

        <p
          className={styles.text__address}
          title={data.address}
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

      <div className={cn(styles.otherInfo, styles[theme])}>
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
    </div>
  )
}

export default React.memo(ManufacturerListItem)

