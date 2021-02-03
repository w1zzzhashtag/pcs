import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import cn from 'classnames'

import { CatalogListHeader } from '../../../../featurers/catalogList/children'

import { headerBottomList } from './../HeaderVariants'
import styles from './../Header.module.scss'
import listIcon from './../../../../assets/images/list-icon.png'


const HeaderBottom: React.FC = () => {
  const location = useLocation()

  const [catalogListIsOpen, setCatalogListIsOpen] = React.useState(false)
  const openCatalogList = () => setCatalogListIsOpen(true)
  const closeCatalogList = () => setCatalogListIsOpen(false)

  return (
    <nav className={styles.bottom__nav}>
      <div
        className={cn(styles.bottom__nav__item, {
          [styles.bottom__nav__item_active]: location.pathname.match('catalog-group/')
        })}
        onMouseEnter={openCatalogList}
        onMouseLeave={closeCatalogList}
      >

        <span>Каталог товаров</span>
        <img
          src={listIcon}
          alt="listIcon"
          className={styles.bottom__nav__item__icon} />

        <AnimatePresence>
          {catalogListIsOpen && (
            <motion.div
              className={styles.bottom__nav__item__list}
              variants={headerBottomList}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <CatalogListHeader />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <NavLink
        to="/manufacturers"
        className={styles.bottom__nav__item}
        activeClassName={styles.bottom__nav__item_active}
      >
        Производители</NavLink>
    </nav>
  )
}

export default HeaderBottom
