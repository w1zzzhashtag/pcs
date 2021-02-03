import React from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import { ThemeContext } from '../../../app/contexts'
import { regionItemType } from './../../../featurers/region/regionTypes'

import { HeaderTop, HeaderBottomNav } from './children'
import { SearchGlobal } from './../../../featurers/searchGlobal/children'

import { headerBottomVariants, } from './HeaderVariants'
import styles from './Header.module.scss'

interface IProps {
  activeRegion: regionItemType
}

const Header: React.FC<IProps> = ({ activeRegion }) => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <header className={cn(styles.wrapper, styles[theme])}>
      <HeaderTop
        activeRegion={activeRegion} />

      <motion.div className={cn(styles.bottom, styles[theme])}
        variants={headerBottomVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.container}>
          <HeaderBottomNav />
          <SearchGlobal />
        </div>
      </motion.div>
    </header>
  )
}

export default Header
