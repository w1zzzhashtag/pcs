import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import { regionItemType } from '../../../featurers/region/regionTypes'
import { ThemeContext } from './../../../app/contexts'
import styles from './Logo.module.scss'

interface P {
  activeRegion: regionItemType
  url: string
}

const Logo: React.FC<P> = ({ activeRegion, url }) => {
  const { theme } = React.useContext(ThemeContext)
  
  return (
    <NavLink
      to={url}
      className={styles.wrapper}
    >
      <img
        src={process.env.PUBLIC_URL + activeRegion.features.emblem_small}
        alt={activeRegion.features.logoName}
        className={styles.img}
      />
      <div className={cn(styles.caption, styles[theme])}>
        <p className={styles.caption__title}>
          {activeRegion.features.logoName}
        </p>
        <p className={styles.caption__subtitle}>
          Каталог производителей
        </p>
      </div>
    </NavLink>
  )
}

export default Logo
